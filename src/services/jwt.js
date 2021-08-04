const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/index.js')

const createToken = (userId, userUsername, userEmail, userAdmin, userApiKey, userEmailVerify) => {
    const token = jwt.sign(
         {
             user_id: userId,
             user_username: userUsername,
             user_email: userEmail,
             user_admin: userAdmin,
             user_APIKey: userApiKey,
             user_emailVerify: userEmailVerify
         },
         jwtKey,
         {
             expiresIn: "6h"
         }
    );
    return token;
};

const verifyToken = (token) => {
    const test = jwt.verify(token, jwtKey, (err, decoded) => {
        if(err){
            return {status: 400, message: "Token error"};
        };

        return {status: 200, data: decoded};
    });
    return test;
        
};

const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = { createToken, verifyToken, decodeToken };