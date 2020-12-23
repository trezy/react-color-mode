// Module imports
const path = require('path')





module.exports = {
	devtool: 'source-map',
	entry: './lib/index.js',
	externals: {
		process: '_',
		react: 'react',
		'react/jsx-runtime': 'react/jsx-runtime',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' },
			},
		],
	},
	// optimization: {
	// 	runtimeChunk: true,
	// },
	output: {
		filename: 'index.js',
		globalObject: 'this',
		library: 'next-color-mode',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist'),
	},
}
