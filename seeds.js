var Product = require('./models/product');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/DevShop');

var products = [
    new Product({
        imagePath: "https://downloads.2kgames.com/civilization/civvi_fb_share.jpg",
        title: "Civiliation 6",
        description: "Sid Meier's Civilization VI is a turn-based 4X video game and the sixth main title in the Civilization series. Civilization VI was developed by Firaxis Games, published by 2K Games, and distributed by Take-Two Interactive.",
        price: 60
    }),
    new Product({
        imagePath: "https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg",
        title: "Dark Souls 3",
        description: "Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco Entertainment for PlayStation 4, Xbox One, and Microsoft Windows.",
        price: 60
    }),
    new Product({
        imagePath: "https://overwatch-a.akamaihd.net/img/logos/overwatch-share-3d5a268515283007bdf3452e877adac466d579f4b44abbd05aa0a98aba582eeaebc4541f1154e57ec5a43693345bebda953381a7b75b58adbd29d3f3eb439ad2.jpg",
        title: "Overwatch",
        description: "Overwatch is a team-based multiplayer first-person shooter video game developed and published by Blizzard Entertainment. It was released in May 2016 for Microsoft Windows, PlayStation 4, and Xbox One. ",
        price: 60
    }),

];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
