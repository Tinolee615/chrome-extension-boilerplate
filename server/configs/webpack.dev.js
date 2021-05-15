/*
 * @Author: 子辰
 * @Date: 2021-05-11 18:14:55
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-15 11:46:29
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate-ts\server\configs\webpack.dev.js
 */
import { resolve } from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import WebpackBar from 'webpackbar';
import { HotModuleReplacementPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import entry from '../utils/entry';
import { PROJECT_ROOT, __DEV__ } from '../utils/commons';

function getCssLoaders(importLoaders) {
    return [
        {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: __DEV__ },
        },
        {
            loader: 'css-loader',
            options: {
                modules: false,
                sourceMap: true,
                importLoaders,
            },
        },
    ];
}

const commonConfig = {
    mode: 'development',
    devtool: 'eval-source-map',
    context: PROJECT_ROOT,
    entry,
    watchOptions: {
        ignored: ['node_modules', 'extension', 'public'],
    },
    output: {
        publicPath: '/',
        path: resolve(PROJECT_ROOT, 'extension'),
        filename: 'js/[name].js',
        // 将热更新临时生成的补丁放到 hot 文件夹中
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(PROJECT_ROOT, 'public'),
                    globOptions: {
                        ignore: ['**/public/*.html'],
                    },
                },
                {
                    from: resolve(PROJECT_ROOT, `src/manifest.json`),
                    to: 'manifest.json',
                },
            ],
        }),
        new WebpackBar({
            name: 'chrome extension',
            color: '#0f9d58',
        }),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            minify: false,
            chunks: ['options'],
            filename: 'options.html',
            title: 'options page',
            template: resolve(PROJECT_ROOT, 'public/options.html'),
        }),
        new HtmlWebpackPlugin({
            minify: false,
            chunks: ['popup'],
            filename: 'popup.html',
            title: 'popup page',
            template: resolve(PROJECT_ROOT, 'public/popup.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            ignoreOrder: false,
        }),
        new HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(js|ts|tsx)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: getCssLoaders(0),
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            name: '[name].[contenthash].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
};
export default commonConfig;
