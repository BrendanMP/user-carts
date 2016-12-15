# NodeJS Shopping Cart
###WDI Project 2 
This is a Node app built with Express, Mongo, Handlebars, SCSS, and Bootstrap V4. Hosted with Heroku and mLabs, deployed [here...](https://blooming-escarpment-65220.herokuapp.com/)   

### User Stories
The goal of this project was to create a basic boilerplate shop and checkout experience.
 
#### The Customer 
* Customers can add items to a session stored shopping cart.
* Customers can modify item quantities from cart page.
* Customers can checkout.
    * Customers must be logged in to checkout.
    * If prompted to login in during a checkout attempt the app and redirects to continue checkout process.
* Customers can see list of orders.
* Customers can logout.

### Features
* Stripe.js api integration. Use CC # `4242424242424242` `12/17` `123` to send me fake money!
* CSRF (Cross-Site Request Forgery) Protection with cSurf.
* Encrypted & salted passwords with passport & bcrypt.
* Form validation with express-validator & stripe.js.

### Todos
* Integrate a gulp file for build processes and easier sharing.
* Refactor controller functions into separate files.
* Update image hosting to https.

### Future Features
I'd like to continue to expand on the app and use this repo as place to experiment with new ideas and continue to learn more about working with server-side Node apps.
* Create an Admin User & Dashboard for managing items and orders.
* Richer user experience.
    * Transactional Emails
    * Expanded user profiles. Save address, payment methods etc.
    * Add animations to give the UI some life.
