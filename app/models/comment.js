var mongoose = require('mongoose'),
    db       = mongoose.connection,
    comment  = mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        post:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        publish: {
            type: Date,
            required: true
        },
        content: {
            type: String,
            required: false
        }
    }),
    Comment     = mongoose.model('Comment' , comment , 'comment');
db.once('open' , () => { console.log('connection with comment is succeeded') });
db.on('error' , console.error.bind(console , 'connection with comment is failed'));
module.exports = Comment;