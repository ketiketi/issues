var Controller = require('locomotive').Controller;

var controller = new Controller();

controller.index = function() {
  this.title = 'Locomotive';
  this.render();
}

module.exports = controller;
