/********************************************************************************
 * Copyright (C) 2020 hwstaff_y00228954 All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import * as https from "https";
import * as cloudide from '@cloudide/plugin';
import { exposable, expose } from '@cloudide/messaging';
import { LogLevel } from '@cloudide/core/lib/common/plugin-common';
import { AbstractBackend } from '@cloudide/core/lib/node/plugin-api';

/**
 * Add your backend api in this class
 * Using '@expose' to expose your function to frontend
 */
@exposable
export class Backend extends AbstractBackend {

    /**
     * function call to the backend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin backend
     * In this function you can call function exposed by frontend 
     */
    public async run(): Promise<void> {
    }

    public stop(): void {

    }

    @expose('https.request')
    public async httpsRequest(options: https.RequestOptions): Promise<string> {
        console.log(`start requesting: ${JSON.stringify(options)}`);
        return new Promise((resolve, reject) => {
            let res = '';
            https.request(options, response => {
                response.setEncoding('utf8');
                response.on('error', err => {
                    reject(err);
                });
                response.on('data', chunk => {
                    res += chunk;
                });
                response.on('end', () => {
                    resolve(res);
                });
            }).end();
        });
    }

}
