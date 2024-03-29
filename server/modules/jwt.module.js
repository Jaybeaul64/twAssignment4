const jwt = require('jsonwebtoken');

async function createToken(payload){
    return await jwt.sign(payload, process.env.JWT_SECRET)
}

async function decodeToken(token){
    return await jwt.decode(token);
}

async function verifyToken(token){
    try{
        return await jwt.verify(token, process.env.JWT_SECRET);
    }catch(error){
        console.error('bad token');
        console.error(error);
    }
}

module.exports = {createToken, decodeToken, verifyToken, }