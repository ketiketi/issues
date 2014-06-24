## Files to include in program listing:
#### Controllers
- app/controllers/accountController.js
- app/controllers/projectsController.js
- app/controllers/issuesController.js

#### Models
- app/models/projectsController.js
- app/models/issuesController.js

#### Views
##### Layouts
- app/views/_layout/header.html.ejs
- app/views/_layout/footer.html.ejs

##### Account
- app/views/account/login.html.ejs

##### Projects
- app/views/projects/index.html.ejs

##### Issues
- app/views/issues/index.html.ejs
- app/views/issues/show.html.ejs

#### Styles
- public/stylesheets/layout.css
- public/stylesheets/screen.css
- public/stylesheets/controls.css
- public/stylesheets/classes.css
- public/stylesheets/login.css

#### Configuration
- config/routes.js

##### Initializers
- config/initializers/01_views.js
- config/initializers/02_mongoose.js
- config/initializers/03_passport.js
- config/initializers/04_middleware.js
- config/initializers/05_seed_admin.js
