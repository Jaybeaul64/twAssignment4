const jwt = require('jsonwebtoken');

async function createToken(payload){
    return await jwt.sign(payload, process.env.JWT_SECRET)
}

async function verifyToken(token){
    try{
        const check = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(check);
        return check;
    }catch(error){
        console.error('bad token');
        console.error(error.message);
    }
    return false;
}

module.exports = {createToken, verifyToken, }