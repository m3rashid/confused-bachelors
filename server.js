// packages -- express body-parser ejs mongoose passport express-session passport-local passport-local-mongoose dotenv marked jsdom dompurify lodash

// express -- firing up the server
// body-parser -- taking form inputs
// ejs -- creating view engine
// mongoose -- managing database
// passport, passport-local, passport-local-mongoose and express-session -- web session and authentication
// marked -- create markdown from blog form input
// jsdom -- creating virtual dom to render the markedown
// dompurify -- sanitizing the HTML to make sure no scripts are executed in the form body

// lodash -- formatting text for slugs or titles (use slug package instead)
// slugify -- to maintain the uniqueness of URL by adding URL slug at the end


const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

// Database models
const Blog = require("./models/blogs")
const Writer = require("./models/writer")

// Handling environment variables
require('dotenv').config()

const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const session = require("express-session")

const marked = require("marked")
const createDomPurify = require("dompurify")
const {JSDOM} = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)

// Setting up initial express server
const app = express()
app.set('view engine', 'ejs')
app.set("views", "views")
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))


// Setitng up user session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// initializing user session
app.use(passport.initialize());
app.use(passport.session());

// Mongoose connection with database
mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Passport authentication setup
passport.use(Writer.createStrategy());
passport.serializeUser(Writer.serializeUser());
passport.deserializeUser(Writer.deserializeUser());








// Setting up the login route
app.get("/login", function (req, res) {
    res.render("login", {
        titleTop: "Login"
    });
});

app.get("/", (req, res) => {
    res.render("index-homepage.ejs")
})




























app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

// Firing up (listening to) the exress server
const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log(`Server is up on port ${port}`);
});