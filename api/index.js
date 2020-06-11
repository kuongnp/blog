'use strict';

import { port as _port, host as _host } from './config.js';
import { server as _server } from '@hapi/hapi';
import Path from 'path';
import { plugin } from 'mongoose';

global.__basedir = __dirname;


const server = _server({
    port: _port,
    host: _host,
    router: {
        stripTrailingSlash: true
    },
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'files')
        }
    }
});

const init = async () => {
    try {
        await server.register(
            [
                require('@hapi/inert'),
                require('./plugins/category'),
                require('./plugins/comment'),
                require('./plugins/media'),
                require('./plugins/menu'),
                require('./plugins/post'),
                require('./plugins/tag'),
                require('./plugins/user')
            ]
        );

        server.route({
            method: 'GET',
            path: '/files/{param*}',
            handler: {
                directory: {
                    path: '.',
                    redirectToSlash: true,
                    index: true,
                }
            }
        });

        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

init();
