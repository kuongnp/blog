"use strict";

let Controller      = require('./controller.js');

let routes = [
    { method: 'GET', path: '/posts', handler: Controller.list },
    { method: 'GET', path: '/posts/{id}', handler: Controller.get },
    { method: 'GET', path: '/posts/slug/{slug}', handler: Controller.getBySlug },
    { method: 'POST', path: '/posts', handler: Controller.create },
    { method: 'PUT', path: '/posts/{id}', handler: Controller.update },
    { method: 'DELETE', path: '/posts/{id}', handler: Controller.remove },
];

module.exports = routes;
