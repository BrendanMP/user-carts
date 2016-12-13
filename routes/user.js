var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csfrProtection = csrf();
router.use(csfrProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('user/profile')
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup',{
        title: 'Sign Up',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/login',
    failureFlash: true
}));

router.get('/login', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/login',{
        title: 'Login',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}
