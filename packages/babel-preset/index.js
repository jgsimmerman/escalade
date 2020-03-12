'use strict'
const { declare } = require(`@babel/helper-plugin-utils`)

module.exports = declare((api, options) => { // declare function allows better error handling - https://babeljs.io/docs/en/next/babel-helper-plugin-utils.html
	const {
		targets,
		version,
		modules,
	} = options

	api.assertVersion(version || 7) // forces babel version

	const debug = typeof options.debug === `boolean` ? options.debug : false // debug mode for @babel/preset-env
	const development = typeof options.development === `boolean`
		? options.development
		: api.cache.using(() => process.env.NODE_ENV === `development`) // dev mode for @babel/preset-react

	return {
		presets: [
			[require(`@babel/preset-env`), {
				debug,
				targets: targets || `> 0.25%, not dead`,
				modules: modules === false ? false : `auto`,
			}],
			[require(`@babel/preset-react`), { development }],
		], // presets that include most of the plugins needed
		plugins: [
			require(`@babel/plugin-transform-runtime`),
			require(`@babel/plugin-proposal-function-bind`),
			require(`@babel/plugin-proposal-export-default-from`),
			require(`@babel/plugin-proposal-logical-assignment-operators`),
			[require(`@babel/plugin-proposal-optional-chaining`), {
				loose: false,
			}],
			[require(`@babel/plugin-proposal-pipeline-operator`), {
				proposal: `minimal`,
			}],
			[require(`@babel/plugin-proposal-nullish-coalescing-operator`), {
				loose: false,
			}],
			require(`@babel/plugin-proposal-do-expressions`),
			[require(`@babel/plugin-proposal-decorators`), {
				legacy: true,
			}],
			require(`@babel/plugin-proposal-function-sent`),
			require(`@babel/plugin-proposal-export-namespace-from`),
			require(`@babel/plugin-proposal-numeric-separator`),
			require(`@babel/plugin-proposal-throw-expressions`),
			require(`@babel/plugin-syntax-dynamic-import`),
			require(`@babel/plugin-syntax-import-meta`),
			[require(`@babel/plugin-proposal-class-properties`), {
				loose: false,
			}],
			require(`@babel/plugin-proposal-json-strings`),
			require(`babel-plugin-dynamic-import-node`),
			require(`@babel/plugin-proposal-object-rest-spread`),
		], // plugins not included in presets
	}
})