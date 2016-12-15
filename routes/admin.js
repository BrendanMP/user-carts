var express = require('express');
var router = express.Router();

/* GET Admin page. */
router.get('/', function(req, res, next) {
    res.render('admin', { layout: 'admin-dash', title: 'Dashboard' });
});

module.exports = router;
