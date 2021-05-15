/*
 * @Author: 子辰
 * @Date: 2021-05-11 18:20:05
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-15 11:42:56
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate-ts\server\utils\entry.js
 */
import { resolve } from 'path';
import fs from 'fs';

import { HOST, PORT, HRM_PATH, __DEV__ } from './commons';

const src = resolve(__dirname, '../../src');
const HMR_URL = encodeURIComponent(`http://${HOST}:${PORT}${HRM_PATH}`);
// !: 必须指定 path 为 devServer 的地址，不然的话热更新 client 会向 chrome://xxx 请求
const HMRClientScript = `webpack-hot-middleware/client?path=${HMR_URL}&reload=true&overlay=true`;

const backgroundPath = resolve(src, './background/index.js');
const optionsPath = resolve(src, './options/index.js');
const popupPath = resolve(src, './popup/index.js');
// const interceptRquestPath = resolve(src, './js/interceptRquest.js');
// const insertInterceptPath = resolve(src, './js/insertIntercept.js');

const devEntry = {
    background: [HMRClientScript, backgroundPath],
    options: [HMRClientScript, optionsPath],
    popup: [HMRClientScript, popupPath],
    // interceptRquest:[HMRClientScript,interceptRquestPath],
    // insertIntercept:[insertInterceptPath]
};
const prodEntry = {
    background: [ backgroundPath],
    options: [ optionsPath],
    popup: [ popupPath],
    // interceptRquest:[interceptRquestPath],
    // insertIntercept:[insertInterceptPath]
}
const entry = __DEV__?devEntry:prodEntry;

const scriptNames = fs.readdirSync(resolve(src, 'contents'));
const validExtensions = ['js'];
scriptNames.forEach((name) => {
    const hasValid = validExtensions.some((ext) => {
        const abs = resolve(src, `contents/${name}/index.${ext}`);
        if (fs.existsSync(abs)) {
            entry[name] = [abs];
            return true;
        }

        return false;
    });

    if (!hasValid) {
        const dir = resolve(src, `contents/${name}`);
        throw new Error(`You must put index.is under ${dir}`);
    }
});

if (entry.content_script && __DEV__) {
    entry.content_script.unshift(resolve(__dirname, './autoRefreshClient.js'));
    entry.background.unshift(resolve(__dirname, './autoReloadClient.js'));
}

export default entry;
