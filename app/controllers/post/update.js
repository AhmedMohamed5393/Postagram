var Post = require('../../models/post'),
    User = require('../../models/user');
module.exports = {
    showEdition: (req, res) => {
        var messages = req.flash('error');
        Post.findById(req.params.id).then(editPost => {
            User.findOne({ _id: editPost.user }).then(poster => {
                res.render('pages/edit', {
                    post: editPost,
                    poster: poster.name,
                    messages: messages
                });
            }).catch(error => {
                req.flash('error_msg', 'There is something wrong here');
                console.log(error)
                res.redirect('back');
            });
        }).catch(err => {
            req.flash('error_msg', 'There is something wrong here');
            console.log(err)
            res.redirect('back');
        });
    },
    UpdatePost: (req, res) => {
        var errors             = [],
            { content, title } = req.body;
        Post.findByIdAndUpdate(req.params.id , {
            content: req.body.content,
            title: req.body.title
        }).then(updatedPost => {
            req.flash('success_msg', 'You updated the post successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! editing process is failed' });
            res.render('pages/edit' , {
                errors, content, title
            });
        });
    },
    DeletePost: (req, res) => {
        var errors = [];
        Post.findByIdAndDelete(req.params.id).then(deletedpost => {
            req.flash('success_msg', 'You deleted the post successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! deleting process is failed' });
            res.render('pages/home' , errors);
        });
    }
}