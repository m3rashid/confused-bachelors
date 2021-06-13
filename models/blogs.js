const mongoose = require("mongoose")

// Database to be used minimalist to ensure no unnecessary and repeated items in the DB

const blogSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    writer: {
        type: String, 
        required: true
    },
    comments: [{
            id: {
                type: Number, 
                unique: true, 
                required: true
            }, 
            name: String, 
            text: String
        }],
    commentReplies: [{
        name: String, 
        text: String, 
        parentComment: Number
    }],
    likes: {
        type: Number, 
        default: 0
    },
    time: {
        type: Date,
        default: new Date.toDateString(),
        required: true
    }
    // category: {type: String, required: true},
    // category: {type: String, required: true},

})

module.exports = new mongoose.model("Blog", blogSchema)