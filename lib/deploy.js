import {SCPRecursive} from './scp-recursive.js'

export class Deploy {
    constructor(config) {
        this._config = config;
    }

    deploy() {
        return new Promise((resolve, reject) => {
            const cfg = this._config;
            const cfg_version = cfg['config-version'];
            if (cfg_version === 'release') {
                const cfg_data = cfg['config-data'];
                for (let target of cfg_data['targets']) {
                    const {user, host, destination, source, jump} = target;
                    const scp = new SCPRecursive(source, {'soft-fail': true});
                    console.log("[+] Deploy for target", '<' + user + '@' + host + '>', "started.");
                    scp.send(user, host, destination,jump, (code) => {
                        target['resultOfDeploy'] = !code ? "Succeed" : "Failed";
                        console.log(JSON.stringify(target, null, '\t'));
                    });
                }
                resolve();
            } else {
                reject(new Error("Only 'release' config-version supported on n-deploy 1.0.0"));
            }
        });
    }
}

export default Deploy;