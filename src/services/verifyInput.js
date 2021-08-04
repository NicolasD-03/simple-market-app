const emailValidator = require('email-validator');

const verifyRegisterInput = (username, password, passwordConfirm, email) => {
    if(!(username && password && passwordConfirm && email)) {
        return {status: 400, message: "All inputs are required"};
    }
    if(username.length > 20){
        return {status: 400, message: "Username is too long"};
    }
    if(password.length < 8 || passwordConfirm.length < 8){
        return {status: 400, message: "Password is  too short"};
    }
    if(!emailValidator.validate(email)){
        return {status: 400, message: "Email is not valid"};
    }
    if(password !== passwordConfirm){
        return {status: 400, message: "Both password don't match"};
    }
};

const verifyLoginInput = (email, password) => {
    if(!(email && password)) {
        return {status: 400, message: "All inputs are required"};
    }
    if(!emailValidator.validate(email)){
        return {status: 400, message: "Email is not valid"};
    }
};



module.exports = { verifyRegisterInput, verifyLoginInput }