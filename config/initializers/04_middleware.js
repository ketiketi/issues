var express  = require('express' ),
    passport = require('passport'),
    flash    = require('connect-flash');

module.exports = function() {
    if ('development' == this.env) {
        this.use(express.logger());
    }

    this.use(flash());

    this.use(express.urlencoded());
    this.use(express.cookieParser());
    this.use(express.cookieSession({ secret: 'issues-secret' }));

    this.use(express.favicon());
    this.use(express.static(__dirname + '/../../public'));
    this.use(express.bodyParser());
    this.use(express.methodOverride());

    this.use(passport.initialize());
    this.use(passport.session   ());

    this.use(this.router);

    this.use(express.errorHandler());
};
