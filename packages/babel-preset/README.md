# @escaladesports/babel-preset
Official Escalade Sports Babel preset

Bundles together several common Babel plugins/presets, including:
- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)
- [@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)
- [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) (disabled for Gatsby sites – see below)
- ...among several others

## Usage with Gatsby
To use this preset with Gatsby sites, a custom `.babelrc` file must include [babel-preset-gatsby](https://www.npmjs.com/package/babel-preset-gatsby) and specify `"gatsby": true` in the options for this preset. The former is required any time a custom Babel config is used on a Gatsby site, and not doing the latter will cause build failures if the Gatsby site is also using [loadable components](https://www.gatsbyjs.org/packages/gatsby-plugin-loadable-components-ssr/) and dynamic `import` statements.

The `.babelrc` should look like this:
```json
{
  "presets": [
    "babel-preset-gatsby",
    [
      "@escaladesports/babel-preset",
      {
        "gatsby": true
      }
    ]

  ]
}
```
