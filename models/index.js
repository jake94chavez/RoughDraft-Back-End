const mongoose = require("mongoose");
let ENV;

try {
  ENV = require('../env');
} catch (ex) {
  ENV = process.env;
}

mongoose.connect(ENV.MONGODB_URI);

module.exports.Post = require("./post");
module.exports.Comment = require("./comment");