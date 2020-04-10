# Direct Children Variant Plugin for Tailwind CSS

## Requirements

This plugin was created for and tested with Tailwind CCS `v1.2.0` and greater.

## Usage

First add the plugin to your `tailwind.config.js` file:

```javascript
plugins: [
  require('@tailwindvue/direct-children-plugin')
]
```

Then add the variant to the utilities you want to use the plugin for.

```javascript
variants: {
  margin: ['direct-children', 'default', 'responsive']
}
```
Make sure to add the `direct-children` variant before other variants and don't forget to add the `default` variant too.

You can now use this variant in your markup:

```html
<div class="direct-children:mb-4">
    <div>One</div>
    <div>Two</div>
</div>
```
