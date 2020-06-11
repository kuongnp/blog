"use strict";

import Pez from '@hapi/pez';
import Wreck from '@hapi/wreck';
import Path from "path";
import Fs from 'fs';
import * as uuid from 'uuid';

const internals = {};

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
            let tempArr = filename.split('.');
            item.extension = tempArr[tempArr.length - 1];
        }

        if (!data.hasOwnProperty(name)) {
            data[name] = [item];
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
    });

    dispenser.on('epilogue', (value) => {
        set('epilogue', value);
    });

    dispenser.on('part', async (part) => {
        const payload = await Wreck.read(part);
        set(part.name, payload, part.headers, part.filename);
    });

    dispenser.on('field', (name, value) => {
        set(name, value);
    });
    
    return new Promise((resolve, reject) => {
        dispenser.once('close', () => resolve(data));
        dispenser.once('error', reject);
        req.pipe(dispenser);
    });
};

internals.handle = function(file) {
    return new Promise((resolve, reject) => {
        const filename = `${uuid.v1()}.${file.extension}`
        const pathname = Path.join(__basedir, 'files',filename)
        const data = file.value
        Fs.writeFile(pathname, data, err => {
            if (err) {
                reject(err)
            }
            resolve({ message: filename + ' Upload successfully!' })
        })
    })
}


module.exports = internals;
