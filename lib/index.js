import parseArgs from 'minimist'


import fs from 'fs/promises';
import {Deploy} from './deploy.js'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_CONFIG_FILE = process.cwd() + '/n-deploy.json';
const DEFAULT_SAMPLE_CONFIG_FILE = __dirname + '/sample-config.json';



export default class Main {

    constructor() {
    }

    _deploy() {
        console.log('[+] Starting n-deploy v1.1');
        fs.readFile(DEFAULT_CONFIG_FILE, { encoding: 'utf8' }).then((data)=>{
            return JSON.parse(data)
        }).then((configJSONObject) => {
            console.log('[+] Configuration has been read.');
            console.log(configJSONObject)
            const deployObject = new Deploy(configJSONObject);
            console.log("[+] Validating deploy targets.");
            deployObject.deploy().catch((err) => {
                console.error('[-] Something went wrong in deploy phase.');
                console.log('Debug output: ', err);
            });
        }).catch((err) => {
            console.error('[-] Error reading config.',DEFAULT_CONFIG_FILE);
            console.log('Debug output: ', err);
        });
    }

    _generateConfig() {
        console.log("[+] Starting n-deploy v1");
        console.log("[+] Printing sample config ... copy & paste into n-deploy.json");
        console.log(this._returnSampleConfig());
    }

    _returnSampleConfig() {
        return fs.readFileSync(DEFAULT_SAMPLE_CONFIG_FILE, 'utf-8');
    }

    run() {
        const args = parseArgs(process.argv.slice(2));
        if (args['help']) {
            console.log("n-deploy --help, shows this.");
            console.log("n-deploy --sample, shows sample config file.");
            console.log("n-deploy --run, runs deploy.");
        } else if (args['sample']) {
            this._generateConfig();
        } else if (args['run']) {
            this._deploy();
        } else {
            console.log("[-] See n-deploy --help.");
        }
    }

}



