var Schema = require('mongoose').Schema;

module.exports = new Schema({
    email   : String,
    username: String,
    password: String,
    role    : String
})
