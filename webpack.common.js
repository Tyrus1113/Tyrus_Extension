const path = require('path')

// 把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清理 dist 目录
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			
		]
	},
	plugins: [
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