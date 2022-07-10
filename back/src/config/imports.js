const express = require('express');
const bodyParser = require('body-parser'); // process json data
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const fs = require('fs');
const socketio = require('socket.io');

module.exports = {
    express: express,
    bodyParser: bodyParser,
    cors: cors,
    morgan: morgan,
    config: config,
    fs: fs,
    socketio: socketio
};
