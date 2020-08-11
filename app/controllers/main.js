var User      = require('../models/user'),
    Post      = require('../models/post'),
    functions = require('../middlewares/functions');
module.exports = {
    GetHomePage: (req , res) => {
        var messages   = req.flash('error'),
            noMatch    = null,
            successMgs = req.flash('success')[0],
            time1      = [],
            time2      = [];
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
                }).then(foundposts => {
                    if(!foundposts){
                        noMatch = 
                          "No posts or users match that query," + 
                          "please try again.";
                    }
                    User.find().then(posters => {
                        foundposts.forEach(foundpost => {
                            time1.push(
                                functions
                                 .datesubtraction(Date.now(), foundpost.publish)
                            );
                        });
                        res.render('pages/home', {
                            posters: posters,
                            posts: foundposts,
                            time: time1,
                            noMatch: noMatch,
                            successMgs: 'Search has been done successfully',
                            noMessages: null,
                            messages: null
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
            Post.find().then(posts => {
                if(posts){
                    posts.forEach(post => {
                        time2.push(
                            functions
                             .datesubtraction(Date.now(), post.publish)
                        );
                    });
                    User.find().then(posters => {
                        res.render('pages/home' , {
                            posters: posters,
                            posts: posts,
                            time: time2,
                            noMatch: noMatch,
                            successMgs: successMgs,
                            noMessages: !successMgs,
                            messages: messages
                        });
                    }).catch(e => {
                        throw e;
                    });
                }
            }).catch(error => {
                throw error;
            });
        }
    }
}