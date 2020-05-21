'use strict';

import { port as _port, host as _host } from './config.js';
import { server as _server } from '@hapi/hapi';
import { plugin } from 'mongoose';


const server = _server({
    port: _port,
    host: _host,
    router: {
        stripTrailingSlash: true
    }
});

const init = async () => {
    try {
        // await server.register(
        //     [
        //         {
        //             plugin: require('./plugins/category')
        //         },
        //         {
        //             plugin: require('./plugins/tag')
        //         },
        //         {
        //             plugin: require('@hapi/good'),
        //             options: {
        //                 reporters: {
        //                     console: [{
        //                         module: 'good-squeeze',
        //                         name: 'Squeeze',
        //                         args: [{
        //                             response: '*',
        //                             log: '*'
        //                         }]
        //                     }, {
        //                         module: 'good-console'
        //                     }, 'stdout']
        //                 }
        //             }

        //         }
        //     ]
        // );
        await server.register(
            [ 
                require('./plugins/category'),
                require('./plugins/comment'),
                require('./plugins/media'),
                require('./plugins/menu'),
                require('./plugins/post'),
                require('./plugins/tag'),
                require('./plugins/user')
            ]
        );
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

init();
