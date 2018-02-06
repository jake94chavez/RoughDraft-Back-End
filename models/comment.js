const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({
	content: String,
	votes: Number
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment;
module.exports.Schema = CommentSchema