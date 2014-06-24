var mongoose = require('mongoose');

module.exports = function() {
    var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/issues-dev';

    mongoose.connect(dbUrl);

    // TODO: Temporary
    var schemas = {};
    schemas.User    = require('../../app/models/user'   );
    schemas.Project = require('../../app/models/project');

    mongoose.model('User'   , schemas.User   );
    mongoose.model('Project', schemas.Project);
}
