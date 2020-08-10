var mongoose = require('mongoose'),
    db       = mongoose.connection,
    post     = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        publish: {
            type: Date,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: false
        }]
    }),
    Post     = mongoose.model('Post' , post , 'post');
db.once('open' , () => { console.log('connection with post is succeeded') });
db.on('error' , console.error.bind(console , 'connection with post is failed'));
module.exports = Post;