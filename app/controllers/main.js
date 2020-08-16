var User      = require('../models/user'),
    Post      = require('../models/post'),
    Comment   = require('../models/comment'),
    functions = require('../middlewares/functions');
module.exports = {
    GetHomePage: (req , res) => {
        var messages     = req.flash('error'),
            noMatch      = null,
            successMgs   = req.flash('success')[0],
            posttime1    = [],
            posttime2    = [],
            commenttime1 = [],
            commenttime2 = [];
        if(req.query.search){
            try {
                var input  = new RegExp(
                       functions.escaperegex(req.query.search), 'gi'
                    );
                Post.find({
                    $or: [
                        { title: input },
                        { content: input }
                    ]
                }).sort({'publish': -1}).then(foundposts => {
                    if(!foundposts){
                        noMatch = 
                          "No posts or users match that query," + 
                          "please try again.";
                    }
                    User.find().then(posters => {
                        foundposts.forEach(foundpost => {
                            posttime1.push(
                                functions
                                 .datesubtraction(Date.now(), foundpost.publish)
                            );
                        });
                        Comment.find().sort({'publish': 1}).then(comments => {
                            comments.forEach(comment => {
                                commenttime1.push(
                                    functions
                                     .datesubtraction(Date.now(), comment.publish)
                                );
                            });
                            res.render('pages/home' , {
                                posters: posters,
                                posts: foundposts,
                                posttime: posttime1,
                                commenttime: commenttime1,
                                comments: comments,
                                noMatch: noMatch,
                                successMgs: successMgs,
                                noMessages: !successMgs,
                                messages: messages
                            });
                        }).catch(comerror  => {
                            req.flash('error_msg', 'There is something wrong');
                            res.redirect('/');
                        });
                    }).catch(error => {
                        throw error;
                    });
                }).catch(e => {
                    throw e;
                });
            } catch (err) {
                throw err;
            }
        }else{
            Post.find().sort({'publish': -1}).then(posts => {
                if(posts){
                    posts.forEach(post => {
                        posttime2.push(
                            functions
                             .datesubtraction(Date.now(), post.publish)
                        );
                    });
                    Comment.find().sort({'publish': 1}).then(comments => {
                        comments.forEach(comment => {
                            commenttime2.push(
                                functions
                                 .datesubtraction(Date.now(), comment.publish)
                            );
                        });
                        User.find().then(posters => {
                            res.render('pages/home' , {
                                posters: posters,
                                posts: posts,
                                posttime: posttime2,
                                commenttime: commenttime2,
                                comments: comments,
                                noMatch: noMatch,
                                successMgs: successMgs,
                                noMessages: !successMgs,
                                messages: messages
                            });
                        }).catch(e => {
                            throw e;
                        });
                    }).catch(comerror  => {
                        req.flash('error_msg', 'There is something wrong');
                        res.redirect('/');
                    });
                }
            }).catch(error => {
                throw error;
            });
        }
    }
}