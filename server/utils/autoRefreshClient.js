/*
 * @Author: 子辰
 * @Date: 2021-05-11 18:23:02
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 09:06:08
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\utils\autoRefreshClient.js
 */
chrome.runtime.onMessage.addListener((request, _sender, sendResp) => {
    console.log('[request]',request);
    const shouldRefresh =
        request.from === 'background' && request.action === 'refresh current page';
    if (shouldRefresh) {
        sendResp({ from: 'content script', action: 'reload extension' });
        // !: 等待扩展 reload
        setTimeout(() => window.location.reload(), 100);
    }
});
