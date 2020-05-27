"use strict";

import Pez from '@hapi/pez';
import Stream from 'stream';
import Wreck from '@hapi/wreck';

const internals = {};

internals.Payload = class extends Stream.Readable {

    constructor(payload, err) {

        super();

        this._data = [].concat(payload);
        this._position = 0;
        this._err = err;
    }

    _read(size) {

        const chunk = this._data[this._position++];

        if (chunk) {
            this.push(chunk);
        }
        else if (!this._err) {
            this.push(null);
        }
    }
};

internals.Recorder = class extends Stream.Writable {

    constructor() {

        super();

        this.buffers = [];
        this.nexts = [];
        this.length = 0;
    }

    _write(chunk, encoding, next) {

        this.length = this.length + chunk.length;
        this.buffers.push(chunk);
        this.nexts.push(next);
        this.emit('ping');
    }

    collect() {

        const buffer = (this.buffers.length === 0 ? Buffer.alloc(0) : (this.buffers.length === 1 ? this.buffers[0] : Buffer.concat(this.buffers, this.length)));
        return buffer;
    }

    next() {

        for (let i = 0; i < this.nexts.length; ++i) {
            this.nexts[i]();
        }

        this.nexts = [];
    }
};

internals.interceptor = function (req, boundary) {

    const dispenser = new Pez.Dispenser({ boundary });
    const data = {};
    const set = function (name, value, headers, filename) {

        const item = { value };

        if (headers) {
            item.headers = headers;
        }

        if (filename) {
            item.filename = filename;
        }

        if (!data.hasOwnProperty(name)) {
            data[name] = item;
        }
        else if (Array.isArray(data[name])) {
            data[name].push(item);
        }
        else {
            data[name] = [data[name], item];
        }
    };

    dispenser.on('preamble', (chunk) => {
        set('preamble', chunk.toString());
        console.log('on premble');
    });

    dispenser.on('epilogue', (value) => {
        set('epilogue', value);
        console.log('on epilogue');
    });

    dispenser.on('part', async (part) => {
        const payload = await Wreck.read(part);
        set(part.name, payload.toString(), part.headers, part.filename);
        console.log('on part');
    });

    dispenser.on('field', (name, value) => {
        set(name, value);
        console.log('on field');
    });

    return new Promise((resolve, reject) => {
        dispenser.once('close', () => resolve(data));
        dispenser.once('error', reject);
        req.pipe(dispenser);
    });
};

module.exports = internals;
