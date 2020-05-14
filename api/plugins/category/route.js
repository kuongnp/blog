"use strict";

let Controller      = require('./controller.js');

let routes = [
    { method: 'GET', path: '/categories', handler: Controller.list },
    { method: 'GET', path: '/categories/{id}', handler: Controller.get },
    { method: 'GET', path: '/categories/slug/{slug}', handler: Controller.getBySlug },
    { method: 'POST', path: '/categories', handler: Controller.create },
    { method: 'PUT', path: '/categories/{id}', handler: Controller.update },
    { method: 'DELETE', path: '/categories/{id}', handler: Controller.remove },
];

module.exports = routes;
