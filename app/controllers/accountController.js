var Controller      = require('locomotive').Controller,
    ensureLoggedIn  = require('connect-ensure-login').ensureLoggedIn,
    ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

var controller = new Controller();

controller.before('login', ensureLoggedOut('/'));

controller.login = function() {
    this.title   = 'Login';
    this.message = this.request.flash('error')[0] || '';

    this.render();
};

controller.logout = function() {
    this.request.logout();
    this.redirect('/login');
}

module.exports = controller;
