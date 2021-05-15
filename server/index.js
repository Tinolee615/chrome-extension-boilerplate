/*
 * @Author: 子辰
 * @Date: 2021-05-11 17:33:46
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 10:14:55
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\index.js
 */
import { __DEV__ } from './utils/commons';

require(`./scripts/${__DEV__ ? 'dev' : 'build'}`);