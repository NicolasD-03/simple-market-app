const randomstring = require('randomstring');

const createRandomString =  async (length) => {
    return await randomstring.generate(length);
};

module.exports = createRandomString;