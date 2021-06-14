// Databasse manager package
const mongoose = require("mongoose")

const marked = require("marked");
const createDomPurify = require("dompurify");
const {JSDOM} = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

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
    content: {
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
blogsSchema.pre("validate", function () {
    if(this.content){
        this.content = dompurify.sanitize(marked(this.content))
    }
})

module.exports = new mongoose.model("Blog", blogSchema)