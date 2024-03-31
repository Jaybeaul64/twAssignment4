const bcrypt = require('bcrypt');

// On register
async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

// On login
async function comparePassword(password, hashedPassword){

    const verified = await bcrypt.compare(password, hashedPassword);

    return verified;
}

module.exports = {
    hashPassword, comparePassword,
}