const jwt = require('../modules/jwt.module');
const mongoose = require('mongoose');

const Movies = mongoose.model('Movies', {}, 'movie');

async function getMovies(genre){
    const movies = await Movies.find({ genres: genre }).limit(25);
    return movies;
}

module.exports = {
    getMovies,
}