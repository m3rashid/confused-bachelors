// jshint esversion: 8

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

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Database models
const Blog = require("./models/blogs");
const Writer = require("./models/writer");

// Handling environment variables
require("dotenv").config();


const session = require("express-session");

// const createDomPurify = require("dompurify");
// const { JSDOM } = require("jsdom");
// const dompurify = createDomPurify(new JSDOM().window);

// Setting up initial express server
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));

// Setitng up user session
app.use(
    session({
        secret: "Secret",
        resave: false,
        saveUninitialized: false,
    })
);


// Mongoose connection with database
const Blogs = require("./blog");
const login = require("./login");
// Setting up the login route
app.get("/:id/blogs", async function(req, res) {
    const id = req.params.id;
    console.log(id);
    let ans = await Blogs.findbyauthor(id);
    res.send(ans);
});

app.get("/compose", async function(req, res) {
    res.render("compose", {
        log: ""
    });
});

app.post("/compose", async function(req, res) {
    let title = req.body.title;
    let writer = _.lowerCase(req.body.writer);
    let content = req.body.content;

    await Blogs.addBlog(writer, title, content);
    res.render("compose", {
        log: "BLOG HAS BEEN ADDED"
    });
})


// Setting up the login route
app.get("/login", function(req, res) {
    res.render("login", {
        titleTop: "Login",
        err: ""
    });
});

app.get("/register", function(req, res) {
    res.render("login", {
        titleTop: "register",
        err: ""
    });
});

app.post("/register", function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);

    bcrypt.hash(req.body.password, 2, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        login.register(req.body.username,hash).then((value)=>{
            console.log(value);
            if(value !== undefined)
            {
                console.log("REGISTERED");
                res.redirect("/login");
            }else{
                console.log("ERROR");
                res.render("login",{
                    titleTop: "register",
                    err: "Error occured"
                });
            }
        });
    
    });
});

app.post("/login",async function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    login.login(req.body.username,req.body.password).then((value)=>{
        bcrypt.compare(req.body.password,value,function(_err,result){
            if(result === true)
            {
                res.redirect('/');
            }else
            {
                res.render("login", {
                    titleTop: "Login",
                    err: "Wrong Password"
                });
            }
        })
    });
});

app.get("/", (req, res) => {
  res.render("index-homepage.ejs");
});
app.get("/blog", (req, res) => {
  res.render("blog-detail-homepage.ejs");
});
app.get("/writers", (req, res) => {
    res.render("writers.ejs");
})

app.post("/newsletter", function(req, res) {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },
        }, ],
    };
    let jsonData = JSON.stringify(data);

    let options = {
        url: process.env.MAILCHIMP_URL,
        method: "POST",
        headers: {
            Authorization: process.env.MAILCHIMP_AUTH,
        },
        body: jsonData,
    };

    request(options, function(error, response, body) {
        if (error) {
            res.render("newsletter-status.ejs", {
                // Options to be taken care of (failure)
            });
        }
        if (response.statusCode == 200) {
            res.render("newsletter-status.ejs", {
                // Options to be taken care of (success)
            });
        } else {
            res.render("newsletter-status.ejs", {
                // Options to be taken care of (failure)
            });
        }
    });
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// Firing up (listening to) the exress server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server is up on port ${port}`)
});
