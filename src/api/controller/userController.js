const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../../services/hashPassword.js');
const createRandomString = require('../../services/createRandomString.js');
const createJWT = require('../../services/createJWT.js')
const Users = require('../../models/userModels.js');
const { verifyRegisterInput, verifyLoginInput } = require('../../services/verifyInput.js')

module.exports = {
    registerUser: async (req, res) => {
        try{
            const { username, password, email } = req.body;
            const inputVerification = verifyRegisterInput(username, password, email);
            if(inputVerification){ 
                return res.status(inputVerification.status).send(inputVerification.message);
            }

            const oldUser = await Users.findOne({ email });
            if(oldUser){
                return res.status(409).send("User already exist, please login");
            }

            const user = await Users.create({
                _id: mongoose.Types.ObjectId(),
                username: username,
                email: email.toLowerCase(),
                password: await hashPassword(password, 10),
                emailKey: await createRandomString(16)
            });
            
            token = createJWT(user._id, user.email, user.isAdmin, user.apiKey);
            user.jwtKey =  token
            await user.save();

            res.cookie("jwt", token, {secure: true, httpOnly: true});
            return res.status(201).json(user);

        }catch(error){
            console.log(error);
        }
    },
    loginUser: async (req, res) => {
        try{
            const { email, password } = req.body;
            const loginVerification = verifyLoginInput(email, password);
            if(loginVerification){
                return res.status(loginVerification.status).send(loginVerification.message);
            }

            const user = await Users.findOne({ email });

            if(user && comparePassword(password, user.password)){
                token = createJWT(user._id, user.email, user.isAdmin, user.apiKey);
                user.jwtKey = token;
                await user.save();
                res.cookie("jwt", token, {maxAges:1000*60*30, secure: true, httpOnly: true,});
                return res.status(200).json(user);
            }

            return res.status(400).send("Invalid email or password")

        }catch(error){
            console.log(error);
        }
    }
};