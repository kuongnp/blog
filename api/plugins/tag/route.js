"use strict";

let Controller      = require('./controller.js');

let routes = [
    { method: 'GET', path: '/tags', handler: Controller.list },
    { method: 'GET', path: '/tags/{id}', handler: Controller.get },
    { method: 'GET', path: '/tags/slug/{slug}', handler: Controller.getBySlug },
    { method: 'POST', path: '/tags', handler: Controller.create },
    { method: 'PUT', path: '/tags/{id}', handler: Controller.update },
    { method: 'DELETE', path: '/tags/{id}', handler: Controller.remove },
];

module.exports = routes;
