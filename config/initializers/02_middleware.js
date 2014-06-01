var express = require('express');

module.exports = function() {
  if ('development' == this.env) {
    this.use(express.logger());
  }
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../public'));
  this.use(express.bodyParser());
  this.use(express.methodOverride());
  this.use(this.router);
  this.use(express.errorHandler());
}
