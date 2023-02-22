const assert = require('assert');
const FileUtils = require('../lib/file-utils');

describe('src/lib/', () => {
    describe('file-utils.js', () => {
        it('FileUtils.readConfig() fulfill', () => {
            return new FileUtils().readConfig().then(() => {
            });
        });

        it('FileUtils.readConfig() reject', () => {
            return new FileUtils().readConfig('unknown-file.json').catch(() => {
            });
        });

        it('FileUtils.readConfig() config immutability', () => {
            return new FileUtils().readConfig().then((actual) => {
                let expected = JSON.parse(require('fs').readFileSync(require('../lib/consts').DEFAULT_CONFIG_FILE, 'utf8'));
                assert.deepEqual(actual, expected);
            });
        })
    });
});