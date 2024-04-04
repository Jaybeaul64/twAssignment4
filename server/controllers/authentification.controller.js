const bcryptModule = require('../modules/bcrypt.module');
const jwt = require('../modules/jwt.module');
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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-\=\[\]{}|;:'",.<>?/~]{8,}$/;
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
            message: {message: 'invalid password format'},
        }
    }

    const hashedPassword = await bcryptModule.hashPassword(document.password);
    
    // store new user to db 
    try{
        const newUser = await new User({email: document.email, password: hashedPassword, favoriteGenre: document.favoriteGenre});
        await newUser.save();
    }catch(err){
        return {
            status: 400,
            message: err.message,
        }
    }

    return {
        status: 201,
        message: {message: 'User created successfully'},
    }
}

// retreive existing user and provide token
async function login(document){
    // find the user
    const user = await User.findOne({email: document.email});
    if(user === null){
        return {
            status: 401,
            message: {message: 'Wrong email or password'},
        }
    }
    console.log('user: ', user);
    
    // compare the password
    if(!await bcryptModule.comparePassword(document.password, user.password)){
        return {
            status: 401,
            message: {message: 'Wrong email or password'},
        }
    }

    // generate token
    const token = await jwt.createToken({
        favoriteGenre: user.favoriteGenre
    });

    return {
        status: 200,
        message: token,
    }
}

module.exports = {
    register, login,
}