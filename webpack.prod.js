const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

// css抽离成单独文件并且设置hash
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩js css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清理 dist 目录
const CleanWebpackPlugin = require('clean-webpack-plugin')

let prodConfig = {
	entry: './src/index.js',
	output: {
		filename: 'ty_bundle.[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	mode: 'production', // 在dist下打包压缩等操作需要在生产环境下执行
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000
	},
	module: {
		rules: [
			{
				test: /\.(sc|c|sa)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
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
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css', // 设置最终输出的文件名
			chunkFilename: '[id].[hash].css'
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
}

module.exports = merge(common, prodConfig)