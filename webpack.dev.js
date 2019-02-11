const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

let devConfig = {
	output: {
		filename: 'ty_bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000
	},
	// 开启 js 的 source map
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(sc|c|sa)ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							sourceMap: true,
							plugins: loader => [
								require('autoprefixer')({browsers: ['> 0.15% in CN']})
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	}
}

module.exports = merge(common, devConfig)