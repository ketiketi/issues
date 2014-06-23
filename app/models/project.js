var Schema = require('mongoose').Schema;

var Comment = new Schema({
    text: String,
    date: Date ,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Issue = new Schema({
    ordinal : { type: Number, index: { unique: true, dropDubs: true, sparse: true } },
    title : String,
    text : String,
    created : Date ,
    progress: { type: String, default: 'Open' },
    severity: { type: Number, default: 1 },
    assigned: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [Comment]
});

module.exports = new Schema({
    title : String,
    name : { type: String, index: { unique: true, dropDubs: true } },
    issues: [Issue],
});
