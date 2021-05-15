/*
 * @Author: 子辰
 * @Date: 2021-05-11 18:07:31
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-11 18:46:09
 * @Description: 描述
 * @FilePath: \awesome-chrome-extension-boilerplate-masterd:\work\chrome\chrome-extension-boilerplate\server\middlewares\index.js
 */
import cors from 'cors'
import webpackMiddleware from './webpackMiddleware';
import extensionAutoReload from './extensionAutoReload';

export default function setupMiddlewares(devServer,compiler){
  devServer.use(cors())
  devServer.use(webpackMiddleware(compiler)),
  devServer.use('/__extension_auto_reload__', extensionAutoReload(compiler));
}