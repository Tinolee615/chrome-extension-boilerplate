/*
 * @Author: 子辰
 * @Date: 2021-05-11 18:44:19
 * @LastEditors: 最后修改者
 * @LastEditTime: 2021-05-12 09:15:07
 * @Description: 描述
 * @FilePath: \chrome-extension-boilerplate\server\middlewares\extensionAutoReload.js
 */
import fs from 'fs';
import { resolve } from 'path';
import { debounce } from 'lodash';
import SSEStream from 'ssestream';

export default function extensionAutoReload(compiler) {
    return (req, res, next) => {
        const sseStream = new SSEStream(req);
        sseStream.pipe(res);

        let closed = false;
        const contentScriptsModules = fs.readdirSync(resolve(__dirname, '../../src/contents'));
        const compileDoneHook = debounce((stats) => {
            const { modules } = stats.toJson({ all: false, modules: true });
            const shouldReload =
                !stats.hasErrors() &&
                modules&&modules.length === 1 &&
                contentScriptsModules.includes(modules[0].chunks[0]);
            if (shouldReload) {
                sseStream.write(
                    {
                        event: 'compiled successfully',
                        data: {
                            action: 'reload extension and refresh current page',
                        },
                    },
                    'utf-8',
                    (err) => {
                        if (err) {
                            console.error(err);
                        }
                    },
                );
            }
        }, 1000);

        // 断开链接后之前的 hook 就不要执行了
        const plugin = (stats) => {
            if (!closed) {
                compileDoneHook(stats);
            }
        };
        compiler.hooks.done.tap('extension-auto-reload-plugin', plugin);

        res.on('close', () => {
            closed = true;
            sseStream.unpipe(res);
        });

        next();
    };
}
