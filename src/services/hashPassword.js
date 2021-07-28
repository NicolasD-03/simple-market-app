const bcrypt = require('bcryptjs');

const hashPassword =  async (password, saltKey) => {
    return await bcrypt.hash(password, saltKey);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };