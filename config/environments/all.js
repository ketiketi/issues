var util = require('util');

module.exports = function() {
    if (this.version !== require('locomotive').version) {
        var warning = 'version mismatch between local (%s) and global (%s) Locomotive module';

        console.warn(util.format(warning, require('locomotive').version, this.version));
    }
}
