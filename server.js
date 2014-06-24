var locomotive = require('locomotive'),
    bootable   = require('bootable');

var app = new locomotive.Application();

app.phase(locomotive.boot.controllers(__dirname + '/app/controllers'));
app.phase(locomotive.boot.views());

app.phase(require('bootable-environment')(__dirname + '/config/environments'));
app.phase(bootable.initializers(__dirname + '/config/initializers'));
app.phase(locomotive.boot.routes(__dirname + '/config/routes'));
app.phase(locomotive.boot.httpServer(process.env.PORT || 3000, process.env.IP || '0.0.0.0'));

app.boot(function(err) {
    if (err) {
        console.error(err.message);
        console.error(err.stack);

        return process.exit(-1);
    }
});
