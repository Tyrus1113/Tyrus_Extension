'use strict'
const path = require('path')

// 把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 清理 dist 目录
const CleanWebpackPlugin = require('clean-webpack-plugin')

// css抽离成单独文件并且设置hash
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 拷贝插件
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 版权声明
const Webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'ty_bundle.[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        // 忽略后缀名 默认值 .js .json
        extensions: ['.js', '.json'],
        // 增加路径别名
        alias: {
            '@': path.resolve(__dirname, 'src/')
        },
        // resolve.modules 用于配置webpack去哪些目录下查找第三方模块 默认是node_modules
        // 第三方模块放在项目根目录时 就没必要按照默认一层层查找 直接指明存放的绝对位置
        modules: [path.resolve(__dirname, 'node_modules')],
        // 第三方模块会定义多个入口文件 mainFields定义使用第三方模块的哪个入口文件
        // 设置尽量少的值可以减少入口文件的搜索步骤
        mainFields: ['main']
    },
    module: {
        rules: [
            {
                test: /\.(sc|c|sa)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // { loader: 'style-loader' },
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
                                require('autoprefixer')({ browsers: ['> 0.15% in CN'] })
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
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ],
                // 仅对src目录下文件使用babel-loader
                include: path.resolve(__dirname, 'src'),
                // 加快编译速度，不包含node_modules文件夹内容
                exclude: path.resolve(__dirname, './node_modules')
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 图片小于指定值 转换成 Base64格式
                        // limit: 1000000,
                        limit: 50000,
                        outputPath: 'img/'
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Webpack App', // 默认值：Webpack App
            filename: 'index.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/index.html'),
            favicon: 'favicon_ty.ico',
            minify: {
                collapseWhitespace: true, // 是否移除空格 
                removeComments: true, // 是否移除注释
                removeAttributeQuotes: true // 移除属性的引号
            }
            // hash: true // 生成 hash
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css', // 设置最终输出的文件名
            chunkFilename: '[id].[hash].css'
        }),
        new CopyWebpackPlugin([
            { from: 'doc', to: './' }
        ]),
        new Webpack.BannerPlugin('Develop 2019 by Tyrus')
    ]
}
