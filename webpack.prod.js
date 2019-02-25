'use strict'
const merge = require('webpack-merge')
const common = require('./webpack.common')

// 压缩js css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

let prodConfig = {
    // 在dist下打包压缩等操作需要在生产环境下执行
    mode: 'production',
    // 增加映射文件 开启 js 的 source map
    devtool: 'cheap-module-source-map',
    module: {
        rules: []
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}

module.exports = merge(common, prodConfig)
