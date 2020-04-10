const plugin = require('./index.js');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const cssMatcher = require('jest-matcher-css');

const generatePluginCss = ({ variants, tailwindOptions }) => {
    const tailwind = tailwindcss({
        theme: {
            screens: {
                'sm': '640px',
            },
        },
        corePlugins: false,
        plugins: [
            plugin,
            ({ addUtilities }) => {
                addUtilities({
                    '.mt-2': {
                        'margin-top': '0.5rem'
                    },
                }, variants);
            },
        ],
        ...tailwindOptions
    });

    return postcss(tailwind)
        .process('@tailwind utilities', { from: undefined })
        .then(result => result.css);
};

expect.extend({ toMatchCss: cssMatcher });

test('it does nothing if the variant is not used', async () => {
    const css = await generatePluginCss({});

    expect(css).toMatchCss(`
        .mt-2 {
            margin-top: 0.5rem
        }
    `);
});

test('it adds the variants if the variant is used', async () => {
    const css = await generatePluginCss({ variants: ['direct-children'] });

    expect(css).toMatchCss(`
        .mt-2 {
            margin-top: 0.5rem
        }

        .direct-children\\:mt-2 > * {
            margin-top: 0.5rem
        }
    `);
});

test('it works with other variants', async () => {
    const css = await generatePluginCss({ variants: ['direct-children', 'default', 'responsive'] });

    expect(css).toMatchCss(`
        .direct-children\\:mt-2 > * {
            margin-top: 0.5rem
        }

        .mt-2 {
          margin-top: 0.5rem
        }
        
        @media (min-width: 640px) {
          .sm\\:direct-children\\:mt-2 > * {
            margin-top: 0.5rem
          }
        
          .sm\\:mt-2 {
            margin-top: 0.5rem
          }
        }
    `);
});

test('it add the prefix if a prefix is set', async () => {
    const css = await generatePluginCss({ variants: ['direct-children'], tailwindOptions: { prefix: 'tw-' } });

    expect(css).toMatchCss(`
        .tw-mt-2 {
          margin-top: 0.5rem
        }
        
        .direct-children\\:tw-mt-2 > * {
          margin-top: 0.5rem
        }
    `);
});
