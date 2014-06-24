var Schema = require('mongoose').Schema;

var Comment = new Schema({
    text: String,
    date: Date ,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

var Issue = new Schema({
    ordinal : Number,
    title   : String,
    text    : String,
    created : Date ,
    progress: { type: String, default: 'Open' },
    severity: { type: Number, default: 1 },
    assigned: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [Comment]
});

var Project = new Schema({
    title : String,
    name  : { type: String, index: { unique: true, dropDubs: true } },
    issues: [Issue],
});

Project.index({ "_id": 1, "issues.ordinal": 1 }, { unique: true, dropDubs: true, sparse: true });

module.exports = Project;
