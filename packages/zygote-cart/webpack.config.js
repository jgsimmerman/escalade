const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractHtml = new ExtractTextPlugin('test.html')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
	stats: {
		assets: false,
		colors: true,
		version: false,
		hash: true,
		timings: true,
		chunks: false,
		chunkModules: false
	},
	context: path.resolve(__dirname, './src'),
	entry: {
		zygote: [
			'./script.js',
			'./style.css',
			'./test.pug'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name]-v1.js',
	},

	module: {

		rules: [
			{
				test: /\.js$/,
				//exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}]
			},
			{
				test: /\.css$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: { importLoaders: 1 },
					},
					'postcss-loader',
				],
			},
			{
				test: /\.pug$/,
				exclude: [/node_modules/],
				use: extractHtml.extract({
					use: ['html-loader', 'pug-html-loader?pretty&exports=false']
				})
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	},
	plugins: [
		extractHtml,
		new OpenBrowserPlugin({ url: 'http://localhost:8080/test.html' })
	],
	devServer: {
		contentBase: path.resolve(__dirname, './dist')
	}
}
