const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sarfraz:2june2002@cluster0.ialmq.mongodb.net/Blogs', { useNewUrlParser: true, useUnifiedTopology: true });

const blogsSchema = {
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}

const Blogs = mongoose.model('posts', blogsSchema);

async function BlogFind() {
    let jsonfile;
    await Blogs.find({}, function(err, post) {
        jsonfile = post;
    });
    return jsonfile;
}

module.exports.find = async function() {
    let jsonfile;
    await Blogs.find({}, function(err, post) {
        jsonfile = post;
    });
    return jsonfile;
};

module.exports.findbyauthor = async function(name) {
    let jsonfile;
    await Blogs.find({ author: name }, function(err, post) {
        if (!err) {
            jsonfile = post;
        }
    })
    return jsonfile;
}

module.exports.addBlog = async function(author, title, content) {
    const newBlog = new Blogs({
        title: title,
        author: author,
        content: content,
        category: ' '
    });
    newBlog.save().then(console.log("SAVED"));
}