const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favoriteGenre: {
        type: String,
        enum: {
            values: ['Drama', 'Comedy', 'Action', 'Sci-fi', 'Animation', 'History', 'Horror', 'Romance'],
            message: '{VALUE} is not supported.',
        },
        required: true,
    },
  });

  module.exports = userSchema;