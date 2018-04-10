var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'nyheter';
	locals.data = {
		nyheter: [],
	};

	// Load the nyheter
	view.on('init', function (next) {

		var q = keystone.list('Nyhet').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')

		q.exec(function (err, results) {
			locals.data.nyheter = results;
			next(err);
		});
	});

	// Render the view
	view.render('nyheter', {title: "Nyheter - Bakkefestivalen 2018"});
};
