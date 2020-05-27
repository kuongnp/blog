"use strict";

import { create, list, get, update, remove } from './controller.js';

let routes = [
    { method: 'GET', path: '/media', handler: list },
    {
        method: 'POST',
        path: '/media',
        config: {
            payload: {
                multipart: true,
                output: 'stream',
                parse: false,
                maxBytes: '209715200'
            },
            handler: create,
        }
    },
    { method: 'GET', path: '/media/{id}', handler: get },
    { method: 'PUT', path: '/media/{id}', handler: update },
    { method: 'DELETE', path: '/media/{id}', handler: remove }
];

module.exports = routes;
