const express = require('express');
const router = express.Router();
const controller = require('../controllers/authentification.controller');

// register
// requires register information, create a new user in the database.
router.post('/register', async function(req, res){

    const obj = await controller.register(req.body);
    
    console.log('status: ', obj.status);
    console.log('message: ', obj.message);

    res.status(obj.status);
    res.send(obj.message);
});

// login
// requires username and password, returns a JWT for authentification.
router.post('/login', async function(req, res){
    const obj = await controller.login(req.body);

    res.status(obj.status);
    res.send(obj.message);
});

module.exports = router;