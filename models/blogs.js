// Databasse manager package

const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://sarfraz:2june2002@cluster0.ialmq.mongodb.net/Blogs', { useNewUrlParser: true, useUnifiedTopology: true });

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
    content: {
        type: String,
        required: true
    }

});



const Posts = mongoose.model('posts', blogSchema);


// module.exports.Blog_home = function() {
//     console.log("CHECKING BLOGS");
//     let jsonans;
//     Posts.find({}, function(result, err) {
//         if (!err) {
//             return err;
//         } else {
//             console.log(result);
//             jsonas = result;
//         }
//     });
//     console.log(jsonans);
//     return jsonans;
// }

Posts.find({}, function(res, err) {
    console.log(res);
});