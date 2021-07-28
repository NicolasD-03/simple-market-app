const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;


const usersShema = new Schema ({
    _id: ObjectId,
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isEmailVerify:{
        type: Boolean,
        default: false
    },
    apiKey: {
        type: String,
        default: null
    },
    jwtKey: {
        type: String
    },
    emailKey: {
        type: String
    },
    cart: {
        type: Array,
        default: []
    }
},{
    versionKey: false
});

const Users = mongoose.model('Users', usersShema);

module.exports =  Users;