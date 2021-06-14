// Databasse manager package
const mongoose = require("mongoose");

// Authentication packages
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session")

// Database to be used minimalist to ensure no unnecessary and repeated items in the DB

const writerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photoURL: { // Photos to be stored in drives (shared links to be used here)
        type: String
    },
    branch: {
        type: String,
        required: true
    },
    // blogsWritten: [{
    //     title: String
    // }]
    // university: {
    //     type: String,
    //     default: "Jamia Millia Islamia, New Delhi"
    // }
})

writerSchema.plugin(passportLocalMongoose)
module.exports = new mongoose.model("Writer", writerSchema)