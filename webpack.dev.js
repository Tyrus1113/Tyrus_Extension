const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

let devConfig = {
	mode: 'development',
	output: {
		filename: 'ty_bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	// 开启 js 的 source map
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000
	},
	module: {
		rules: [
			
		]
	}
}

module.exports = merge(common, devConfig)