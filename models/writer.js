const mongoose = require("mongoose");

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
    photoURL: { // Photos to be stored in google drives (shared links to be used here)
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
module.exports = new mongoose.model("Writer", writerSchema)