var Controller     = require('locomotive').Controller,
    Project        = require('mongoose').model('Project'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var controller = new Controller();

controller.before('*', ensureLoggedIn('/login'));

controller.before('*', function(next) {
    var self = this;

    Project.findOne({ name: this.param('name') }).populate('issues.assigned').exec(function(err, project) {
        if (err) {
            self.error(err);
            return;
        }

        project.issues.sort(function(a, b) { a.ordinal - b.ordinal });

        self.title   = project.title;
        self.project = project;
        next();
    });
});

controller.index = function() {
    this.moment = require('moment');
    this.render();
};

controller.create = function() {
    var self    = this,
        ordinal = 0;

    self.project.issues.forEach(function(issue) {
        if (issue.ordinal > ordinal) {
            ordinal = issue.ordinal;
        }
    });

    self.project.issues.push({
        ordinal : ordinal + 1,
        title   : self.param('title'),
        created : new Date(),
        assigned: this.request.user._id,
    });

    self.project.save(function(err) {
        if (err) {
            self.error(err);
            return;
        }

        self.redirect('/projects/' + self.param('name') + '/' + ordinal + '/edit');
    });
};

module.exports = controller;
