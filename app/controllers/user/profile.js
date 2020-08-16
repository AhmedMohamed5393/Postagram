var User      = require('../../models/user'),
    Post      = require('../../models/post'),
    Comment   = require('../../models/comment'),
    functions = require('../../middlewares/functions');
module.exports = {
    GetUserProfile: (req , res) => {
        User.findById(req.params.id).then(userinfo => {
            var messages    = req.flash('error'),
                posttime    = [],
                commenttime = [];
            Post.find({ user: req.params.id }).sort({'publish': -1}).then(posts => {
                posts.forEach(post => {
                    posttime.
                      push(functions.datesubtraction(Date.now(), post.publish));
                });
                Comment.find().then(comments => {
                    comments.forEach(comment => {
                        commenttime.push(
                            functions.datesubtraction(Date.now(), comment.publish)
                        );
                    });
                    User.find().then(users => {
                        res.render('pages/profile' , {
                            user: userinfo,
                            users: users,
                            posts: posts,
                            comments: comments,
                            posttime: posttime,
                            commenttime: commenttime,
                            messages: messages
                        });
                    }).catch(errors => {
                        req.flash('error_msg', 'There is something wrong');
                        res.redirect('/');
                    });
                }).catch(comerror  => {
                    req.flash('error_msg', 'There is something wrong');
                    res.redirect('/');
                });
            }).catch(error => {
                throw error;
            });
        }).catch(err => {
            res.redirect('back');
        });
    }
}