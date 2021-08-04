const { verifyToken, decodeToken } = require('./jwt.js');
const verifyLengthId = require('./verifyLengthId.js');
const Users = require('../models/userModels.js');

const verifyUserAdmin = async (token) => {
    if(verifyToken(token).status === 200){
        const decodedToken = decodeToken(token);
        if(decodedToken.user_id){
            const userId = decodeToken(token).user_id;
            if(!verifyLengthId(userId)){
                const user = await Users.findById(userId);
                if(user && user.isAdmin){
                    return true;
                }
            }
            
        }
    }
};  


module.exports = { verifyUserAdmin };