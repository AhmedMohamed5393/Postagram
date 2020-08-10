var User      = require('../models/user'),
    Post      = require('../models/post'),
    functions = require('../middlewares/functions');
module.exports = {
    GetHomePage: (req , res) => {
        var messages   = req.flash('error'),
            noMatch    = null,
            successMgs = req.flash('success')[0],
            posts1     = [],
            posts2     = [],
            array1     = [],
            time1      = [],
            array2     = [],
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
                    User.find()
                    .then(posters => {
                        var i = 0;
                        foundposts.forEach(foundpost => {
                            posts1.push(foundpost.user);
                            time1.push(
                                functions
                                 .datesubtraction(Date.now(), foundpost.publish)
                            );
                        });
                        posters.forEach(poster => {
                            if(posts1[i] == poster._id){
                                array1.push(poster.name);
                                i++;
                            }
                        });
                        res.render('pages/home', {
                            posters: array1,
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
                User.find().then(posters => {
                    if(posts){
                        var i = 0;
                        posts.forEach(post => {
                            posts2.push(post.user);
                            time2.push(
                                functions
                                 .datesubtraction(Date.now(), post.publish)
                            );
                        });
                        posters.forEach(poster => {
                            if(poster._id.equals(posts2[i])){
                                array2.push(poster.name);
                                i++;
                            }
                        });
                    }
                    res.render('pages/home' , {
                        posters: array2,
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
            }).catch(error => {
                throw error;
            });
        }
    }
}