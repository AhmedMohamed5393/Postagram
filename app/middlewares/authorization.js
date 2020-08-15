var Post    = require('../models/post'),
    Comment = require('../models/comment');
module.exports = {
    checkPostOwnership: (req, res, next) => {
        if(req.isAuthenticated()){
            Post.find()
            .where({ user: req.user._id })
            .then(posts => {
                next();
            }).catch(err => {
                console.log(err);
                res.redirect('back');
            });
        }else{
            console.log(err);
            res.redirect('back');
        }
    },
    checkCommentOwnership: (req, res, next) => {
        if(req.isAuthenticated()){
            Comment.find()
            .where({ user: req.user._id })
            .then(comments => {
                next();
            }).catch(err => {
                console.log(err);
                res.redirect('back');
            });
        }else{
            console.log(err);
            res.redirect('back');
        }
    }
}