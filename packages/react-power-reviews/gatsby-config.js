require(`dotenv`).config({ silent: true })
const { title, shortTitle, siteUrl } = require(`./site-config`)

module.exports = {
	siteMetadata: {
		title,
		siteUrl,
	},
	plugins: [
		// Build plugins
		`gatsby-plugin-emotion`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-remove-trailing-slashes`,
		`gatsby-plugin-netlify-cms-paths`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/markdown/pages`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/static/uploads`,
				name: `uploads`,
			},
		},
		{
			resolve: `gatsby-plugin-markdown-pages`,
			options: {
				path: `./src/markdown/pages`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-plugin-netlify-cms-paths`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`,
						},
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1200,
							linkImagesToOriginal: false,
							withWebp: {
								quality: 95,
							},
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: title,
				short_name: shortTitle,
				start_url: `/`,
				background_color: `#fff`,
				theme_color: `#52b8fc`,
				display: `minimal-ui`,
				icon: `src/img/icon.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-netlify`,
		{
			resolve: `gatsby-plugin-netlify-cms`,
			options: {
				modulePath: `${__dirname}/src/components/cms.js`,
			},
		},

		// Injections
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-recaptcha`,
		`gatsby-plugin-netlify-identity-widget`,
		`gatsby-plugin-polyfill-io`,
		{
			resolve: `gatsby-plugin-html-attributes`,
			options: {
				lang: `en`,
			},
		},
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: `./src/img/icon.png`,
				injectHTML: true,
				icons: {
					android: false,
					appleIcon: false,
					appleStartup: false,
					coast: false,
					favicons: true,
					firefox: false,
					twitter: false,
					yandex: false,
					windows: false,
				},
			},
		},
		{
			resolve: `gatsby-plugin-web-font-loader`,
			options: {
				google: {
					families: [
						`Oswald`,
						`Open Sans`,
					],
				},
			},
		},
	],
}
