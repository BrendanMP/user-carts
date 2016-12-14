var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        res.render('index', {title: 'Products', products: docs, successMsg: successMsg, noMessage: !successMsg})
    });
});

router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
        console.log(req.session.cart);
    });
});

router.get('/cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
});

router.get('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('cart');
    }
    var stripe = require("stripe")(
        "sk_test_DaCCSrMSbRibPjMrGtSN3gd9"
    );

    var cart = new Cart(req.session.cart);

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function (err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        req.flash('success', 'Successful Purchase');
        req.session.cart = null;
        res.redirect('/');
    });
});

module.exports = router;
