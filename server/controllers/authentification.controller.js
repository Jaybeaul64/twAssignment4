const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = require('../Schemas/userSchema');

// for some reason, I can't export the model.
// I foud online that it is possible to export the schema
// and create the model from the controller, which is what I'm soing here:
const User = mongoose.model ('User', userSchema );

// function to validate email.
// returns true if validation is successful
function validatePassword(password){
    // requires at least eight characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(passwordRegex.test(password)){
        return true;
    }
    return false;
}

// creates a new user
async function register(document){

    // input validation (check if password is secure enough)
    if(!validatePassword(document.password)){
        return {
            status: 400,
            message: 'invalid password format',
        }
    }

    // hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(document.password, salt);
    
    // store new user to db 
    try{
        const newUser = await new User({email: document.email, password: hash, favoriteGenre: document.favoriteGenre});
        await newUser.save();
    }catch(err){
        return {
            status: 400,
            message: err.message,
        }
    }

    return {
        status: 201,
        message: 'User created successfully',
    }
}

// retreive existing user and provide token
function login(document){

}

module.exports = {
    register,
}