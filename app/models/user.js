var mongoose = require('mongoose'),
    db       = mongoose.connection,
    user     = mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true
        },
        birthdate: {
            type: Date,
            required: true
        },
        startdate: {
            type: Date,
            required: true
        },
        posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }]
    }),
    User     = mongoose.model('User' , user , 'user');
db.once('open' , () => { console.log('connection with user is succeeded') });
db.on('error' , console.error.bind(console , 'connection with user is failed'));
module.exports = User;