const models = require('../models');
const Comment = models.Comment;
const Post = models.Post;

function index(req, res) {
	Post.find((err, Posts) => {
		if (err) {
			console.log('index error:' + err);
			res.sendStatus(500);
		}
		for (var i=0;i<Posts.length;i++) {
			if(Posts[i]._id == req.params.id) {
				res.json(Posts[i].comments);
				break;
			}
		}
	})
}

function show(req, res) {
	Post.findOne({_id: req.params.id}, (err, foundPost) => {
		if (err) {
			console.log('index error:' + err);
		}
		let foundComment = foundPost.comments.id(req.params.com_id);
		res.json(foundComment);
	})
}

function create(req, res) {
  let newComment = new Comment(req.body);
  newComment.save((err, createdComment) => {
  	if(err) {res.send(err)}
  	res.status(200).send(createdComment);
  });
}

function update(req, res) {
	console.log('updating id ', req.params.com_id);
	console.log('received body ', req.body);

	Post.findOne({ _id:req.params.id }, function(err, foundPost) {
		if(err) { console.log('error', err); }
		let foundComment = foundPost.comments.id(req.params.com_id);
		foundComment.content = req.body.content;
		foundComment.votes = req.body.votes;
		foundComment.save(function(err, saved) {
			if(err) { console.log('error', err); }
			res.json(saved);
		})
	})
}

function destroy(req, res) {
	console.log('deleting id: ', req.params.com_id);
	Post.findOne({ _id:req.params.id }, function(err, foundPost) {
		let foundComment = foundPost.comments.id(req.params.com_id);
		Comment.remove({_id: req.params.com_id}, function (err) {
			if (err) { console.log('error,', err); }
		})
		Post.findOneAndUpdate({ _id:req.params.id },
			{ $pull: {comments: {_id: req.params.com_id}} },
			function(err, model) {
				if (err) {
					res.status(500).send(err);
				}
				res.status(200).send(model);
				console.log('successfully removed comment with id= ' + req.params.com_id)
			})
	})
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;