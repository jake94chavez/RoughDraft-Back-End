const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

try {
  ENV = require('./env');
} catch (ex) {
  ENV = process.env;
}

mongoose.connect(ENV.MONGODB_URI);

// const users = require('./routes/users');
const posts = require('./routes/posts')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/', posts);

module.exports = app;
