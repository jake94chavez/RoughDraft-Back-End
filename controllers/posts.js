const models = require('../models');
const Post = models.Post;

function index(req, res) {
  Post.find({}, function(err, Posts) {
    if (err) { res.send(err) }
    else res.json(Posts);
  });
}

function show(req, res) {
	Post.findOne({ _id: req.params.id }, (err, Post) => {
		if (err) {
			console.log('index error:' + error);
			res.sendStatus(500);
		}
		res.json(Post)
	})
}

function create(req, res) {
  let newPost = new Post(req.body);
  newPost.save((err, createdPost) => {
  	if (err) {res.send(err)}
  	res.status(200).send(createdPost);
  });
}

function update(req, res) {
	console.log('updating id ', req.params.id);
	console.log('received body ', req.body);

	Post.findOne({_id:req.params.id}, function(err, foundPost) {
		if(err) { console.log('error', err); }
		foundPost.title = req.body.title;
		foundPost.content = req.body.content;
		foundPost.comments = req.body.comments;
		foundPost.save(function(err, saved) {
			if(err) { console.log('error', err); }
			res.json(saved);
		})
	})
}

function destroy(req, res) {
	console.log('deleting id: ', req.params.id);
	Post.remove({_id: req.params.id}, function(err) {
		if (err) { console.log('error', err); }
		console.log('successfully removed post with id= ' + req.params.id);
		res.status(200).send();
	})
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;