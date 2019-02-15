'use strict'
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let devConfig = {
    mode: 'development',
    output: {
        filename: 'ty_bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 开启 js 的 source map
    devtool: 'inline-source-map',
    // 配置 webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        port: 8000,
        overlay: { // 出现错误或者警告的时候 是否覆盖页面线上错误消息
            warnings: true,
            errors: true
        },
        publicPath: '/', // 此路径下的打包文件可在浏览器中访问
        watchOptions: { // 监视文件相关的控制选项
            // webpack 使用文件系统(file system)获取文件改动的通知 在某些情况下 不会正常工作 例如 当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
            poll: true,
            ignored: /node_modules/, // 忽略监控的文件夹 正则
            aggregateTimeout: 300 // 默认值 当第一个文件更改 会在重新构建前增加延迟
        }
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        // 查看(patch)的依赖
        new webpack.NamedModulesPlugin(),
        // 替换插件
        new webpack.HotModuleReplacementPlugin(),
        // 打包模块报表
        new BundleAnalyzerPlugin()
    ]
}

module.exports = merge(common, devConfig)
