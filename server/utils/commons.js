/*
 * @Author: 子辰
 * @Date: 2021-05-10 17:59:00
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 09:33:33
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\utils\commons.js
 */
import { resolve } from 'path';

const HOST = '127.0.0.1';
const PORT = 3800;
const PROJECT_ROOT = resolve(__dirname, '../../');
const HRM_PATH = '/__webpack_HMR__';
const EXTENSION_AUTO_RELOAD_PATH = '/__extension_auto_reload__';

const __DEV__ = process.env.NODE_ENV !== 'production';

export {
    HOST,
    PORT,
    PROJECT_ROOT,
    HRM_PATH,
    EXTENSION_AUTO_RELOAD_PATH,
    __DEV__
};
