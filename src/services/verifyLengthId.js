const verifyLengthId = (id) => {
    if(id.length > 24 || id.length < 24){ 
        return {
        error: true,
        message: "Id is not correct"
        }
    }
};

module.exports =  verifyLengthId;