const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://sarfraz:2june2002@cluster0.ialmq.mongodb.net/Blogs', { useNewUrlParser: true, useUnifiedTopology: true });

const loginSchema = {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}

const login = mongoose.model('logininfo', loginSchema);


module.exports.login = async function(user,password)
{
    let ans = await login.findOne({ username: user });

    return ans.password;
}

module.exports.register = async function(user,password)
{
    let newUser = new login({
        username: user,
        password: password
    });

    let query = await newUser.save().catch((err)=>{
        return undefined;
    });
    return query;
}