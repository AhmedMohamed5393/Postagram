var User      = require('../../models/user'),
    Post      = require('../../models/post'),
    functions = require('../../middlewares/functions');
module.exports = {
    GetUserProfile: (req , res) => {
        User.findById(req.params.id).then(userinfo => {
            var messages = req.flash('error'),
                time     = [];
            Post.find({ user: req.params.id }).then(posts => {
                posts.forEach(post => {
                    time.push(functions.datesubtraction(Date.now(), post.publish));
                });
                res.render('pages/profile' , {
                    user: userinfo,
                    posts: posts,
                    time: time,
                    messages: messages
                });
            }).catch(error => {
                throw error;
            });
        }).catch(err => {
            res.redirect('back');
        });
    }
}