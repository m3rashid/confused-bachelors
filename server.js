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
const { Template } = require("ejs");
const app = express();
var _ = require('lodash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

const Blogs = require("./blog");
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


app.get("/", async function(req, res) {
    let ans = await Blogs.find();
    res.send(ans);
});

app.listen(3000, async function(req, res) {
    console.log("Listening on port 3000");
});