/*
 * @Author: 子辰
 * @Date: 2021-05-11 17:26:48
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-15 11:37:08
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate-ts\src\contents\content_script\index.js
 */
console.log('content script page');
const myBody = document.body
const myRoot = document.createElement('div')
myRoot.id = 'root'
myBody.insertBefore(myRoot,document.body.firstElementChild)

import { createApp } from 'vue'
import App from './App.jsx'

createApp(App).mount('#root')