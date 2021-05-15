/*
 * @Author: 子辰
 * @Date: 2021-05-11 18:23:02
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 09:35:26
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\utils\autoReloadClient.js
 */
function logWithPrefix(info) {
    console.log(`[EAR] ${info}`);
}

// !: 如果服务器配置改了，这里也要做对应的修改
const source = new EventSource('http://127.0.0.1:3800/__extension_auto_reload__');

source.addEventListener(
    'open',
    () => {
        logWithPrefix('connected');
    },
    false,
);

source.addEventListener(
    'message',
    event => {
        logWithPrefix('received a no event name message, data:');
        console.log(event.data);
    },
    false,
);

source.addEventListener(
    'pause',
    () => {
        logWithPrefix('received pause message from server, ready to close connection!');
        source.close();
    },
    false,
);

source.addEventListener(
    'compiled successfully',
    (event) => {
        const shouldReload =
            JSON.parse(event.data).action === 'reload extension and refresh current page';

        if (shouldReload) {
            logWithPrefix('received the signal to reload chrome extension');
            chrome.tabs.query({}, tabs => {
                tabs.forEach(tab => {
                    console.log('[tab]',tab);
                    if (tab.id) {
                        let received = false;
                        chrome.tabs.sendMessage(
                            tab.id,
                            {
                                from: 'background',
                                action: 'refresh current page',
                            },
                            res => {
                                if (!res) return;

                                const { from, action } = res;
                                if (
                                    !received &&
                                    from === 'content script' &&
                                    action === 'reload extension'
                                ) {
                                    received = true;
                                    source.close();
                                    logWithPrefix('reload extension');
                                    chrome.runtime.reload();
                                }
                            },
                        );
                    }
                });
            });
        }
    },
    false,
);

source.addEventListener(
    'error',
    (event) => {
        if (event.target&&event.target.readyState === 0) {
            console.error('You need to open devServer first!');
        } else {
            console.error(event);
        }
    },
    false,
);
