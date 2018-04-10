var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'nyheter';
	locals.filters = {
		nyhet: req.params.nyhet,
	};
	locals.data = {
		nyheter: [],
	};

	// Load the current nyhet
	view.on('init', function (next) {

		var q = keystone.list('Nyhet').model.findOne({
			state: 'published',
			slug: locals.filters.nyhet,
		});

		q.exec(function (err, result) {
			locals.data.nyhet = result;
			next(err);
		});

	});

	// // Load other nyheter
	// view.on('init', function (next) {

	// 	var q = keystone.list('Nyhet').model.find().where('state', 'published').sort('-publishedDate').limit('4');

	// 	q.exec(function (err, results) {
	// 		locals.data.nyheter = results;
	// 		next(err);
	// 	});

	// });

	// Render the view
	view.render('nyhet');
};
