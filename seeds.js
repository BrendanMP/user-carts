var Product = require('./models/product');

var mongoose = require('mongoose');

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost:27017/DevShop');
}

mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);

mongoose.connection.once('open', function() {
    console.log("Mongoose has connected to MongoDB!");
});

var products = [
    new Product({
        imagePath: "https://i.imgur.com/20jolrc.jpg",
        title: "Civiliation 6",
        description: "Sid Meier's Civilization VI is a turn-based 4X video game and the sixth main title in the Civilization series/",
        price: 60
    }),
    new Product({
        imagePath: "https://i.imgur.com/ZCdOoug.jpg",
        title: "Dark Souls 3",
        description: "Dark Souls III is an action role-playing video game developed by FromSoftware and published by Bandai Namco.",
        price: 60
    }),
    new Product({
        imagePath: "https://i.imgur.com/LoWMBPd.jpg",
        title: "Overwatch",
        description: "Overwatch is a team-based multiplayer first-person shooter video game developed and published by Blizzard Entertainment.",
        price: 60
    }),
    new Product({
        imagePath: "https://i.imgur.com/OvuOduu.jpg",
        title: "Steep",
        description: "Steep is an open world extreme sports video game developed by Ubisoft Annecy and published by Ubisoft.",
        price: 60
    }),
    new Product({
        imagePath: "https://i.imgur.com/HH6tKc2.jpg",
        title: "Battlefield 1",
        description: "Battlefield 1 is a first-person shooter video game developed by EA DICE and published by Electronic Arts.",
        price: 60
    }),
    new Product({
        imagePath: "https://i.imgur.com/9xKjoKM.jpg",
        title: "Dead Rising 4",
        description: "Dead Rising 4 is an open world survival horror beat 'em up video game developed by Capcom Vancouver and published by Microsoft Studios for Microsoft Windows and Xbox One.",
        price: 60
    })
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
