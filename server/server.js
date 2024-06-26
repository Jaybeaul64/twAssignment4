require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/database');
const authRouter = require('./routers/authentification.router');
const moviesRouter = require('./routers/movies.router');
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
    res.send({message: 'Server Runing.'})
})

app.use('/authentication', authRouter); // authentification router
app.use('/movies', moviesRouter); // Movies router

const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect();
    console.log("Server listening on port " + port)
})