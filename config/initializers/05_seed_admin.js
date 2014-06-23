var User = require('mongoose').model('User');

module.exports = function() {
    User.findOne({ username: 'Admin' }).exec(function(error, user) {
        if (!error && !user) {
            user = new User({
                email : 'admin@example.com',
                username: 'Admin',
                password: '$2a$10$IHa5L/NRXXo4C6m6wBMhT.A105xHrh8siqeKBBVCeXibMmyHZIvyq',
                role : 'admin'
            });

            user.save();
        }
    });
}
