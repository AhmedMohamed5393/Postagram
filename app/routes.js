var express           = require('express'),
    router            = express.Router(),
    bodyParser        = require('body-parser'),
    parseUrlencoded   = bodyParser.urlencoded({ extended: true }),
    methodOverride    = require('method-override'),
    authentication    = require('./middlewares/authentication'),
    authorization     = require('./middlewares/authorization'),
    signupcontroller  = require('./controllers/user/signup'),
    signincontroller  = require('./controllers/user/login'),
    profilecontroller = require('./controllers/user/profile'),
    maincontroller    = require('./controllers/main'),
    createcontroller  = require('./controllers/post/create'),
    updatecontroller  = require('./controllers/post/update');
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
                                         createcontroller.showCreation);
router.post('/', parseUrlencoded, authentication.isLoggedIn,
                                  createcontroller.createPost);
router.get('/post/:id/edit', parseUrlencoded, authentication.isLoggedIn,
                                              authorization.checkPostOwnership,
                                              updatecontroller.showEdition);
router.put('/post/:id', parseUrlencoded, authentication.isLoggedIn,
                                         authorization.checkPostOwnership,
                                         updatecontroller.UpdatePost);
router.delete('/post/:id', parseUrlencoded, authentication.isLoggedIn,
                                            authorization.checkPostOwnership,
                                            updatecontroller.DeletePost);
module.exports = router;