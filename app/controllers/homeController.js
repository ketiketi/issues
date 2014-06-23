var Controller     = require('locomotive').Controller,
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var controller = new Controller();

controller.before('*', ensureLoggedIn('/login'));

controller.index = function() {
    this.redirect('/projects');
};

module.exports = controller;
