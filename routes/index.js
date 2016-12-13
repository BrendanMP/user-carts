var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function (req, res, next) {
    Product.find(function(err, docs) {
        res.render('index', {title: 'Products', products: docs})
    });
});

router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
        console.log(req.session.cart);
    });
});

module.exports = router;
