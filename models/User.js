const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    nickname: {
        type: String ,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: '',
    },
    location: {
        type: String,
    },
    join_date: {
        type: Number,
        required: true,
        default: Date.now() 
    }
    ,
    refreshToken: String
    
});

module.exports = mongoose.model('User', userSchema);