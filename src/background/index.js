/*
 * @Author: 子辰
 * @Date: 2021-05-11 17:26:48
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 14:30:26
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\src\background\index.js
 */
console.log('This is background page!');
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    const url = details.url;
    console.log('[url]',url);

    return {cancel: false}
  },{urls: ["<all_urls>"]},["blocking"])
// export default null;
