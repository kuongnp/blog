'use strict';
import routes from './route';
const category = {
    name: 'post',
    version: '1.0.0',
    register: async function (server, options) {
        server.route(routes);
    }
};
