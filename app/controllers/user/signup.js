var bcrypt = require('bcryptjs'),
    User   = require('../../models/user');
module.exports = {
    GetSignUpPage: (req , res) => {
        var messages = req.flash('error');
        res.render('pages/signup' , {
            messages: messages
        });
    },
    PostSignUpPage: (req, res) => {
        const { name, address, birthdate, email, password, repassword } = req.body;
        let errors = [];
        if (!name || !email || !password || !repassword || !address || !birthdate) {
          errors.push({ msg: 'Please enter all fields' });
        }
        if (password != repassword) {
          errors.push({ msg: 'Passwords do not match' });
        }
        if (password.length < 6) {
          errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if (errors.length > 0) {
          res.render('pages/signup', {
            errors, name, email, password, repassword, address, birthdate
          });
        } else {
          User.findOne({
            $or: [{
              name: name,
              email: email,
              password: password
            }]
          }).then(user => {
            if (user) {
              errors.push({ msg: 'Email or username or password already exists' });
              res.render('pages/signup', {
                  errors, name, email, password, repassword, address, birthdate
              });
            }else {
              const newuser = new User({
                name, email, password, address, birthdate,
                startdate: new Date().getFullYear()
              });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                  if (err) {
                    errors.push({ msg: err.msg });
                  }
                  newuser.password = hash;
                  newuser.save().then(user => {
                      req.flash('success_msg',
                                'You are now registered successfully');
                      res.redirect('/');
                  }).catch(err => { throw err });
                });
              });
            }
          });
        }
    }
}