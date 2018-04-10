var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'artister';
	locals.filters = {
		artist: req.params.artist,
	};
	locals.data = {
		artister: [],
	};

	// Load the current nyhet
	view.on('init', function (next) {

		var q = keystone.list('Artist').model.findOne({
			state: 'published',
			slug: locals.filters.artist,
		});

		q.exec(function (err, result) {
			locals.data.artist = result;
			next(err);
		});

	});

	// Render the view
	view.render('artist');
};
