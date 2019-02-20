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
        }
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
                // 加快编译速度，不包含node_modules文件夹内容
                exclude: /(node_module)/
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
