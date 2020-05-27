'use strict';
import routes from './route';

const media = {
    name: 'media',
    version: '1.0.0',
    register: async function (server, options) {
        server.route(routes);
    }
};

module.exports = media;
