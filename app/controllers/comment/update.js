var Comment = require('../../models/comment'),
    Post    = require('../../models/post'),
    User    = require('../../models/user');
module.exports = {
    UpdateComment: (req, res) => {
        var errors      = [],
            { content } = req.body;
        Comment.findByIdAndUpdate(req.params.id , {
            content: req.body.content
        }).then(updatedComment => {
            req.flash('success_msg', 'You updated the comment successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! editing process is failed' });
            res.render('pages/home' , {
                errors, content
            });
        });
    },
    DeleteComment: (req, res) => {
        var errors = [];
        Comment.findByIdAndDelete(req.params.id).then(deletedcomment => {
            req.flash('success_msg', 'You deleted the comment successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! deleting process is failed' });
            res.render('pages/home' , errors);
        });
    }
}