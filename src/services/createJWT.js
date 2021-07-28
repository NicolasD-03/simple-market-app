const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/index.js')

const createToken = (userId, userEmail, userAdmin, userApiKey) => {
    const token = jwt.sign(
         {
             user_id: userId,
             user_email: userEmail,
             user_admin: userAdmin,
             user_APIKey: userApiKey
         },
         jwtKey,
         {
             expiresIn: 1000*60*30
         }
    );
    return token;
};

module.exports = createToken;