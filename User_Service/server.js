//use express js to create server
const express = require('express');
//create app var to store server
const app = express();
const server = require('http').createServer(app)
    //set up cors(allow frontend to call)
    const cors = require('cors')
app.use(cors());

module.exports = {
    app,
    express,
    server
}