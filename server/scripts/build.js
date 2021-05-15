/*
 * @Author: 子辰
 * @Date: 2021-05-12 10:01:31
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 10:03:54
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\scripts\build.js
 */
import webpack from 'webpack';
import { argv } from 'yargs';

import prodConfig from '../configs/webpack.prod';

const compiler = webpack(prodConfig);
compiler.run((error, stats) => {
    if (error) {
        console.error(error);
        return;
    }

    const analyzeStatsOpts = {
        preset: 'normal',
        colors: true,
    };

    console.log(stats.toString(!!argv.analyze ? analyzeStatsOpts : 'minimal'));
});
