/*
 * @Author: 子辰
 * @Date: 2021-05-11 17:34:14
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 10:13:19
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\scripts\dev.js
 */
import chalk from 'chalk';
import express from 'express';
import webpack from 'webpack';
import { PORT, HOST } from '../utils/commons'
import setupMiddlewares from '../middlewares'
import devConfig from '../configs/webpack.dev';

async function start() {
  const devServer = express();
  const compiler = webpack(devConfig);
  setupMiddlewares(devServer,compiler)
  const httpServer = devServer.listen(PORT, HOST, () => {
      const coloredAddress = chalk.cyan.underline(`http://${HOST}:${PORT}`);
      console.log(`${chalk.bgGreen.white(' INFO ')} DevServer is running at ${coloredAddress} ✔`,);
  });

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, () => {
          // 先关闭 devServer
          httpServer.close();
          console.log(chalk.greenBright.bold(`\ndevServer is ${signal}`));
          // 退出 node 进程
          process.exit();
      });
  });
}
start();
