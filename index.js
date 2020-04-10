const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addVariant, e }) {
    addVariant('direct-children', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
            return `.${e(`direct-children${separator}${className}`)} > *`;
        });
    });
});
