var Controller     = require('locomotive').Controller,
    Project        = require('mongoose').model('Project'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var controller = new Controller();

controller.before('*', ensureLoggedIn('/login'));

controller.index = function() {
    var self = this;

    self.title = 'Projects';

    Project.find({}, function(err, projects) {
        if (err) {
            self.error(err);
            return;
        }

        self.projects = projects;
        self.render();
    });
};

controller.create = function() {
    var self = this;

    var title   = self.param('name'),
        name    = title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'),
        project = new Project({ name: name, title: title });

    project.save(function(err) {
        if (err) {
            self.error(err);
            return;
        }

        self.redirect('/projects');
    });
};

module.exports = controller;
