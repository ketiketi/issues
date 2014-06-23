var passport = require('passport');

module.exports = function routes() {
    // HomeController routes
    this.root('home#index');

    // AccountController routes
    this.get ('/login' , 'account#login' );
    this.post('/login' , passport.authenticate('local', { successRedirect: '/',
                                                          failureRedirect: '/login',
                                                          failureFlash   : true }));
    this.get ('/logout', 'account#logout');

    this.get ('/account', 'account#show'); // Stub, implement later
    this.post('/account', 'account#edit'); // Stub, implement later

    // ProjectsController routes
    this.get ('/projects'             , 'projects#index' );
    this.post('/projects'             , 'projects#create');
    this.get ('/projects/:name/edit'  , 'projects#show'  );
    this.post('/projects/:name/edit'  , 'projects#edit'  );
    this.get ('/projects/:name/delete', 'projects#delete');

    // IssuesController routes
    this.get ('/projects/:name'           , 'issues#index' );
    this.post('/projects/:name'           , 'issues#create');
    this.get ('/projects/:name/:id'       , 'issues#show'  );
    this.post('/projects/:name/:id'       , 'issues#edit'  );
    this.get ('/projects/:name/:id/delete', 'issues#delete');
}
