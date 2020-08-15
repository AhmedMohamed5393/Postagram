var express            = require('express'),
    router             = express.Router(),
    bodyParser         = require('body-parser'),
    parseUrlencoded    = bodyParser.urlencoded({ extended: true }),
    methodOverride     = require('method-override'),
    authentication     = require('./middlewares/authentication'),
    authorization      = require('./middlewares/authorization'),
    signupcontroller   = require('./controllers/user/signup'),
    signincontroller   = require('./controllers/user/login'),
    profilecontroller  = require('./controllers/user/profile'),
    maincontroller     = require('./controllers/main'),
    cpostcontroller    = require('./controllers/post/create'),
    upostcontroller    = require('./controllers/post/update'),
    ccommentcontroller = require('./controllers/comment/create'),
    ucommentcontroller = require('./controllers/comment/update');
router.use(methodOverride('_method'));
router.use('/user/login', parseUrlencoded, authentication.notLoggedIn,
                                           authentication.checkNotLogged);
router.get('/', parseUrlencoded, authentication.isLoggedIn,
                                 maincontroller.GetHomePage);
router.get('/user/:id/profile', parseUrlencoded, authentication.isLoggedIn,
                                                 authorization.checkPostOwnership,
                                                 profilecontroller.GetUserProfile);
router.get('/user/logout', parseUrlencoded, authentication.isLoggedIn,
                                            authentication.logout);
router.get('/user/signup', parseUrlencoded, authentication.notLoggedIn,
                                            signupcontroller.GetSignUpPage);
router.post('/user/signup', parseUrlencoded, authentication.notLoggedIn,
                                             signupcontroller.PostSignUpPage);
router.get('/user/login', parseUrlencoded, authentication.notLoggedIn,
                                           signincontroller.GetSignInPage);
router.post('/user/login', parseUrlencoded, signincontroller.PostSignInPage);
router.get('/post/new', parseUrlencoded, authentication.isLoggedIn,
                                         cpostcontroller.showCreation);
router.post('/', parseUrlencoded, authentication.isLoggedIn,
                                  cpostcontroller.createPost);
router.put('/post/:id', parseUrlencoded, authentication.isLoggedIn,
                                         authorization.checkPostOwnership,
                                         upostcontroller.UpdatePost);
router.delete('/post/:id', parseUrlencoded, authentication.isLoggedIn,
                                            authorization.checkPostOwnership,
                                            upostcontroller.DeletePost);
router.post('/comment/:id', parseUrlencoded, authentication.isLoggedIn,
                                             ccommentcontroller.createComment);
router.put('/comment/:id', parseUrlencoded, authentication.isLoggedIn,
                                            authorization.checkCommentOwnership,
                                            ucommentcontroller.UpdateComment);
router.delete('/comment/:id', parseUrlencoded, authentication.isLoggedIn,
                                               authorization.checkCommentOwnership,
                                               ucommentcontroller.DeleteComment);
module.exports = router;