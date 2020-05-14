const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port:3000,
        host:'localhost'
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();


'use strict';

const Config = require('./config.js');
const Hapi = require('hapi');


const server = Hapi.server({
    port: Config.api.port,
    host: Config.api.host,
    router: {
        stripTrailingSlash: true
    }
});

const init = async () => {
    try {
        await server.register(
            [
                {
                    plugin: require('./plugins/category')
                },
                {
                    plugin: require('./plugins/tag')
                },
                {
                    plugin: require('good'),
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
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

init();
