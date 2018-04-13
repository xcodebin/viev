/**
 * 本地预览
 */

var path = require('path');
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.base.config.js');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = merge(webpackBaseConfig, {
    // 入口
    entry: {
        main: './examples/main',
        vendors: ['vue', 'vue-router']
    },
    // 输出
    output: {
        path: path.join(__dirname, '../examples/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            xview: '../../src/index',
            vue: 'vue/dist/vue.esm.js'
            // vue: 'vue/dist/vue.runtime.js'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendor.bundle.js' }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../examples/dist/index.html'),
            template: path.join(__dirname, '../examples/index.html')
        }),
        new FriendlyErrorsPlugin()
    ],
    devServer: {
        disableHostCheck: true,
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: 'localhost',
        port: 8089,
        proxy: {
            '/itas': {                                                  //代理服务器
                target: 'http://58.247.0.18:18004/',
                // target: 'http://127.0.0.1:8079/',
                // target: 'http://144.131.252.220:18003/',
                changeOrigin: true,
                filter: function (pathname, req) {
                    return pathname.match('^/itas') && req.method === 'POST'
                    // return !pathname.match('^.*/itas/.*\\.(html|js|css|png|gif|jpg|tpl|woff|woff2|tff|map|eot|coffee|exe|pkg|ico)$')
                }
            }
        },
    },
});
