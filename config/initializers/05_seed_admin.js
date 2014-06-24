var User = require('mongoose').model('User');

module.exports = function() {
    User.findOne({ username: 'ketiket' }).exec(function(error, user) {
        if (!error && !user) {
            user = new User({
                email : 'olga@issues-bkr.herokuapp.com',
                username: 'olga.m',
                password: '$2a$10$0weUnzVnQY/DoeH1p4ItAOfAMxyPHmkSoglSamr5G7g/cffIaTLhy', // 0100
                role : 'admin'
            });

            user.save();
        }
    });
}
