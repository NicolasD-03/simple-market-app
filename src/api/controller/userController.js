const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../../services/hashPassword.js');
const createRandomString = require('../../services/createRandomString.js');
const verifyLengthId = require('../../services/verifyLengthId.js');
const { createToken, verifyToken } = require('../../services/jwt.js')
const Users = require('../../models/userModels.js');
const { verifyRegisterInput, verifyLoginInput } = require('../../services/verifyInput.js');

module.exports = {
    registerUser: async (req, res) => {
        try{
            const { username, password, passwordConfirm, email } = req.body;
            const inputVerification = verifyRegisterInput(username, password, passwordConfirm, email);
            if(inputVerification){ 
                return res.status(inputVerification.status).json({ type: "error", message: inputVerification.message});
            }

            const oldUser = await Users.findOne({ email: email.toLowerCase() });
            if(oldUser){
                return res.status(409).json({type: "error", message: "User does already exist, please go to login"});
            }

            const user = await Users.create({
                _id: mongoose.Types.ObjectId(),
                username: username,
                email: email.toLowerCase(),
                password: await hashPassword(password, 10),
                emailKey: await createRandomString(16)
            });
            
            const token = createToken(user._id, user.username, user.email, user.isAdmin, user.apiKey, user.isEmailVerify);
            user.jwtKey =  token
            await user.save();

            return res.status(201).json({type: "success", message: "Register successful, you can now login"});
        }catch(error){
            console.log(error);
        }
    },
    loginUser: async (req, res) => {
        try{
            const { email, password } = req.body;
            const inputVerification = verifyLoginInput(email, password);
            if(inputVerification){
                return res.status(inputVerification.status).json({ type: "error", message: inputVerification.message});
            }

            const user = await Users.findOne({ email: email.toLowerCase() });
            if(!user){
                return res.status(404).json({type: "error", message: "User doesn't exist"});
            }
            const passwordResult = await comparePassword(password, user.password);
            if(!passwordResult){
                return res.status(403).json({type: "error", "message": "Invalid password"});
            }
            const token = createToken(user._id, user.username, user.email, user.isAdmin, user.apiKey, user.isEmailVerify);
            user.jwtKey = token;
            await user.save();
            res.cookie("token", token, {expires: new Date(Date.now() + 21600000), httpOnly: false});
            return res.status(200).json({type: "success", "message": "Login successful"});
        }catch(error){
            console.log(error);
        }
    },
    verifyEmail: async (req, res) => {
        const { emailToken } = req.params;

        const user = await Users.findOne({emailKey: emailToken});
        
        if(!user){
            return res.status(400).send("Sorry, your accout is already verify !");
        }

        user.isEmailVerify = true;
        user.emailKey = null;
        
        const token = createToken(user._id, user.username, user.email, user.isAdmin, user.apiKey, user.isEmailVerify);
        user.jwtKey = token;
        await user.save();
        res.cookie("token", token, {expires: new Date(Date.now() + 21600000), httpOnly: false});

        return res.status(200).send("Your accout is verify. Welcome!");
    },
    verifyToken: async (req, res) => {
        const token = req.get('token');
        const jwtVerification = verifyToken(token);
        if(jwtVerification.status === 400){
            return res.status(jwtVerification.status).json({ type: "error", message: jwtVerification.message });
        };
        const user = await Users.findById(jwtVerification.data.user_id);
        if(!user){
            return res.status(404).json({ type: "error", message: "User with this token didn't exist" });
        }
        return res.status(200).json({ type: "success" });
    },
    updateUser: async (req, res) => {
        const { userId } = req.params;
        const body = req.body;
        const token = req.get('token');

        if(verifyLengthId(userId)){
            return res.status(400).send("Id is not correct")
        };

        const jwtVerification = verifyToken(token);
        if(jwtVerification.status === 400){
            return res.status(jwtVerification.status).send(jwtVerification.message);
        };

        const user = await Users.findById(userId);
        if(user){
            if(user.jwtKey === token){
                await Users.findByIdAndUpdate(userId, body);
                const updatedUser = await Users.findById(userId);
                const newToken = createToken(updatedUser._id, updatedUser.username, updatedUser.email, updatedUser.isAdmin, updatedUser.apiKey, updatedUser.isEmailVerify);
                updatedUser.jwtKey = newToken;
                await updatedUser.save();
                res.cookie("token", newToken, {maxAges:1000*60*30, secure: true, httpOnly: true});
                return res.status(200).json(updatedUser);
            };
            return res.status(401).send("JWT is not valid");
        };
        return res.status(404).send("User not found");
    },
    getItemCart: async (req, res) => {
        const { userId } = req.params;
        const token = req.get('token');
        if(verifyLengthId(userId)){
            return res.status(400).send("Id is not correct");
        };
        if(!token){
            return res.status(401).send("Token is required");
        };
        const jwtVerification = verifyToken(token);
        if(jwtVerification.status === 400){
            return res.status(jwtVerification.status).send(jwtVerification.message);
        };

        const user = await Users.findById(userId);

        if(!user){
            return res.status(404).send("User doesn't exist");
        };

        if(user.jwtKey !== token){
            return res.status(401).send("Token is not valid");
        };

        return res.status(200).json(user.cart);
    },
    createItemCart: async (req, res) => {
        const body = req.body;
        const { userId } = req.params;
        const token = req.get('token');
        if(verifyLengthId(userId)){
            return res.status(400).send("Id is not correct");
        };
        if(!body.quantity || typeof(body.quantity) !== "number"){
            return res.status(400).send("Request is not valid");
        }
        if(!token){
            return res.status(401).send("Token is required");
        };
        const jwtVerification = verifyToken(token);
        if(jwtVerification.status === 400){
            return res.status(jwtVerification.status).send(jwtVerification.message);
        };

        const user = await Users.findById(userId);

        if(!user){
            return res.status(404).send("User doesn't exist");
        };

        if(user.jwtKey !== token){
            return res.status(401).send("Token is not valid");
        };

        

        user.cart.push(body);
        await user.save();
        
        return res.status(201).json(user.cart);

    },
    deleteItemCart: async (req, res) => {
        const { userId, itemId } = req.params;
        const token = req.get('token');
        if(verifyLengthId(userId)){
            return res.status(400).send("Id is not correct");
        };
        if(!token){
            return res.status(401).send("Token is required");
        };
        const jwtVerification = verifyToken(token);
        if(jwtVerification.status === 400){
            return res.status(jwtVerification.status).send(jwtVerification.message);
        };

        const user = await Users.findById(userId);

        if(!user){
            return res.status(404).send("User doesn't exist");
        };

        if(user.jwtKey !== token){
            return res.status(401).send("Token is not valid");
        };

        const indexCartItem = user.cart.findIndex((x) => x.id === itemId);
        if(indexCartItem === -1){
            return res.status(404).send("Item not found");
        };
        user.cart.splice(indexCartItem, 1);
        await user.save();
        return res.status(200).json(user.cart);
    },
    updateItemCart: async (req, res) => {
        const { userId, itemId } = req.params;
        const body = req.body;
        const token = req.get('token');
        if(verifyLengthId(userId) && verifyLengthId(itemId)){
            return res.status(400).send("Id is not correct");
        };
        if(!token){
            return res.status(401).send("Token is required");
        };
        const jwtVerification = verifyToken(token);
        if(jwtVerification.status === 400){
            return res.status(jwtVerification.status).send(jwtVerification.message);
        };

        const user = await Users.findById(userId);

        if(!user){
            return res.status(404).send("User doesn't exist");
        };

        if(user.jwtKey !== token){
            return res.status(401).send("Token is not valid");
        };
        if(!body.quantity || typeof(body.quantity) !== "number"){
            return res.status(400).send("Request is not valid");
        }

        const cartIdItem = user.cart.findIndex((x) => x.id === itemId);
        if(cartIdItem === -1){
            return res.status(404).send("Item not found");
        };

        const updatedCartItem = {...user.cart[cartIdItem], quantity: body.quantity};
        user.cart[cartIdItem] = updatedCartItem
        const newCart = user.cart;
        user.cart = newCart;
        const newUser = await Users.findByIdAndUpdate(userId, {cart: newCart});
        await newUser.save();
        return res.status(200).json(user.cart);
    }
};