'use strict';
import router from './route';
const category = {
    name: 'category',
    version: '1.0.0',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/test',
            handler: function (request, h) {
                return 'hello, world';
            }
        });
        // etc ...
        await someAsyncMethods();
    }
};
