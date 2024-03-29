const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies.controller');
const jwt = require('../modules/jwt.module');

router.get('/', async function(req, res) {
    const token = req.headers.authorization;

    // check signature
    const verifiedToken = await jwt.verifyToken(token)
    if(!verifiedToken){
        res.status(401);
        res.send({message: 'Unothorized.'});
    }
    // find the movies
    const movies = await controller.getMovies(token.favoriteGenre)
    //console.log(movies);

    // return the 25 movies
    res.status(200);
    res.send(movies);
})

module.exports = router;