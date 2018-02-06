const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const PostSchema = new Schema ({
	title: String,
	content: String,
	comments:[Comment.Schema]
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post;