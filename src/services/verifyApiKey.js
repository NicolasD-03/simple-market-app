const { apiKey } = require('../config/index.js');

const verifyApiKey = (req) => {
    if(!req.get('Api-Key')){
        return {status: 403, message: "API key is required to do that"};
    };
    if(req.get('Api-Key') !== apiKey){
        return {status: 401, message: "Invalid API key"};
    };
};

module.exports = verifyApiKey;