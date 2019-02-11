const path = require('path')

// css抽离成单独文件并且设置hash
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩js css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清理 dist 目录
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000
	},
	module: {
		rules: [
			
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css', // 设置最终输出的文件名
			chunkFilename: '[id].[hash].css'
		}),
		new HtmlWebpackPlugin({
			title: 'HtmlWebpackPlugin', // 默认值：Webpack App
			filename: 'index.html', // 默认值： 'index.html'
			template: path.resolve(__dirname, 'src/index.html'),
			minify: {
				collapseWhitespace: true, // 是否移除空格
				removeComments: true, // 是否移除注释
				removeAttributeQuotes: true // 移除属性的引号
			}
		}),
		new CleanWebpackPlugin(['dist'])
	]
}