/*
 * @Author: 子辰
 * @Date: 2021-05-11 18:10:52
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-11 23:07:18
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\middlewares\webpackMiddleware.js
 */
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
export default function (compiler) {
  const devMiddlewareOptions = {
      publicPath:'/',
      stats: 'minimal',
      writeToDisk: true,
  };
  return [
      webpackDevMiddleware(compiler, devMiddlewareOptions),
      webpackHotMiddleware(compiler, { path:  '/__webpack_HMR__'}),
  ];
}