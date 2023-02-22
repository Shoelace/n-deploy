import parseArgs from 'minimist'

// import pack from '../package.json' assert {type:'json'}; // still experiemental as of feb 2023. so just update version manually

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

    _deploy(configfile) {
        console.info('[+] Starting n-deploy v1.1');

        fs.readFile(configfile?configfile:DEFAULT_CONFIG_FILE, { encoding: 'utf8' }).then((data)=>{
            return JSON.parse(data)
        }).then((configJSONObject) => {
            console.info('[+] Configuration has been read.');

            const deployObject = new Deploy(configJSONObject);

            console.info("[+] Validating deploy targets.");

            console.info("[+] Deploying targets.");
            deployObject.deploy().catch((err) => {
                console.error('[-] Something went wrong in deploy phase.');
                console.log('Debug output: ', err);
            });

        }).catch((err) => {
            console.error('[-] Error reading config.', err.path);
            console.log('Debug output: ', err);
        });
    }

    _generateConfig() {
        console.error("[+] Starting n-deploy v1.1");
        console.error("[+] Printing sample config ... copy & paste into n-deploy.json");
        this._printSampleConfig();
    }

    _printSampleConfig() {
         fs.readFile(DEFAULT_SAMPLE_CONFIG_FILE,  { encoding: 'utf8' }).then((data)=>{
            console.info( data)
        })
    }

    run() {
        const args = parseArgs(process.argv.slice(2), {alias:{ "help":["h"] , "run":["r"] ,"config":["c"]} });
        if (args['help'] ) {
            console.log("n-deploy --help, shows this.");
            console.log("n-deploy --sample, shows sample config file.");
            console.log("n-deploy --run, runs deploy.");
        } else if (args['sample']) {
            this._generateConfig();
        } else if (args['run'] ) {
            this._deploy(args['config']);
        } else {
            console.log("[-] See n-deploy --help.");
        }
    }

}



