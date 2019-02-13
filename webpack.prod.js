const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

// 压缩js css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

let prodConfig = {
    // 在dist下打包压缩等操作需要在生产环境下执行
    mode: 'production',
    output: {
        filename: 'ty_bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
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
