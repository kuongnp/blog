'use strict';

import { port as _port, host as _host } from './config.js';
import { server as _server } from '@hapi/hapi';


const myServer = _server({
    port: _port,
    host: _host,
    router: {
        stripTrailingSlash: true
    }
});

const init = async () => {
    try {
        await myServer.register(
            [
                {
                    plugin: require('./plugins/category')
                },
                {
                    plugin: require('./plugins/tag')
                },
                {
                    plugin: require('@hapi/good'),
                    options: {
                        reporters: {
                            console: [{
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{
                                    response: '*',
                                    log: '*'
                                }]
                            }, {
                                module: 'good-console'
                            }, 'stdout']
                        }
                    }

                }
            ]
        );
        await myServer.start();
        console.log(`Server running at: ${myServer.info.uri}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

init();
