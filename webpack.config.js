const defaults = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');
const path = require('path');
const config = { ...defaults };

// Add server only for development mode and not for production.
if ('production' !== process.env.NODE_ENV) {
	config.devServer = {
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'all',
		host: 'localhost',
		port: 8887,
		proxy: {
			'/build': {
				pathRewrite: {
					'^/build': '',
				},
			},
		},
	};
}

module.exports = {
	...config,
	entry: {
		...getWebpackEntryPoints(), // For blocks.
		index: './src/index.tsx'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@data': path.resolve(__dirname, './src/data'),
			'@interfaces': path.resolve(__dirname, './src/interfaces'),
			'@components': path.resolve(__dirname, './src/components'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@pages': path.resolve(__dirname, './src/pages'),
		},
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
	},
};
