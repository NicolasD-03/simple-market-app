const emailValidator = require('email-validator');

const verifyRegisterInput = (username, password, email) => {
    if(!(username && password && email)) {
        return {status: 400, message: "All input is required"};
    }
    if(username.length > 20){
        return {status: 400, message: "Username is too long"};
    }
    if(password.length < 8){
        return {status: 400, message: "Password is  too short"};
    }
    if(!emailValidator.validate(email)){
        return {status: 400, message: "Email is not valid"};
    }
};

const verifyLoginInput = (email, password) => {
    if(!(email && password)) {
        return {status: 400, message: "All input is required"};
    }
    if(!emailValidator.validate(email)){
        return {status: 400, message: "Email is not valid"};
    }
};



module.exports = { verifyRegisterInput, verifyLoginInput }