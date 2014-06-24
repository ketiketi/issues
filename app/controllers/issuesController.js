var mongoose       = require('mongoose'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    Controller     = require('locomotive').Controller,
    Project        = mongoose.model('Project'),
    User           = mongoose.model('User');

var controller = new Controller();

controller.before('*', ensureLoggedIn('/login'));

controller.before('*', function(next) {
    var self = this;

    Project.findOne({ name: self.param('name') }).populate('issues.assigned').populate('issues.comments.user').exec(function(err, project) {
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

controller.before('show', function(next) {
    var self = this;

    User.find({}, function(err, users) {
        if (err) {
            self.error(err);
            return;
        }

        self.users = users;
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

        self.redirect('/projects/' + self.param('name') + '/' + (ordinal + 1) + '/edit');
    });
};

controller.show = function() {
    var self = this;

    self.moment = require('moment');
    self.issue = self.project.issues.filter(function(i) { return i.ordinal == self.param('id'); })[0]
    self.render();
}

controller.edit = function() {
    var self = this;

    self.redirect('/projects/' + this.param('name') + '/' + this.param('id'));
}

controller.delete = function() {
    var self = this;

    self.project.issues.filter(function(i) { return i.ordinal == self.param('id'); })[0].remove();

    self.project.save(function (err) {
        if (err) {
            self.error(err);
            return;
        }

        self.redirect('/projects/' + self.param('name'));
    });
}

module.exports = controller;
