var mongoose = require('mongoose');

module.exports = function() {
    switch (this.env) {
        case 'development':
        default:
            mongoose.connect('mongodb://localhost:27017/issues-dev');
            break;
    }

    // TODO: Temporary
    var schemas = {};
    schemas.User    = require('../../app/models/user'   );
    schemas.Project = require('../../app/models/project');

    mongoose.model('User'   , schemas.User   );
    mongoose.model('Project', schemas.Project);
}
