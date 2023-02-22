import { spawn } from 'child_process';
import { lstatSync } from 'fs';

class SCPRecursive {

    constructor(source, options = {'soft-fail': false}) {
        this._softFail = options['soft-fail'];
        this._error = false;

        try {
            this._isDirectory(source);
        } catch (exception) {
            this._error = true;
            if (!this._softFail) {
                throw exception;
            }
        }
    }

    _isDirectory(source) {
        this._stats = lstatSync(source);
        if (this._stats.isDirectory()) {
            this._source = source;
        } else {
            throw new Error("Path must be a directory. This is a recursive SCP.");
        }
    }


    send(user, host, destination, jump, cb) {
        const send =
            typeof user === 'string'
            && typeof host === 'string'
            && typeof destination === 'string'
            && !this._error;

        if (send === true) {
            const connectionString = user + '@' + host + ':' + destination;
            let scpargs = ['-r', this._source, connectionString]
            if(jump){
                scpargs.unshift(jump)
                scpargs.unshift("-J")
            }
            const scp = spawn('scp', scpargs);
            scp.on('close', (code) => {
                if (typeof cb === 'function') cb(code);
            })
        } else {
            cb(-1);
        }
    }
}

export {SCPRecursive}
export default SCPRecursive;