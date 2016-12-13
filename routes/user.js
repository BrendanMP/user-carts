var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csfrProtection = csrf();
router.use(csfrProtection);

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/profile', function (req, res, next) {
    res.render('user/profile')
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin',{
        title: 'Sign In',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
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

module.exports = router;
