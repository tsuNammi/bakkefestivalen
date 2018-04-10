var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'nyheter';
	locals.filters = {
		nyhet: req.params.nyhet,
	};
	locals.data = {
		nyheter: [],
	};
	
		// Load the current nyhet
	view.on('init', function (next) {
		var q = keystone.list('Nyhet').model.findOne({}).sort({publishedDate: 'desc'});
		q.exec(function (err, result) {
			locals.data.nyhet = result;
			next(err);
		});

	});
	
	// Load the nyheter
	view.on('init', function (next) {

		var q = keystone.list('Nyhet').paginate({
			page: req.query.page || 1,
			perPage: 6,
			maxPages: 1,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate');

		q.exec(function (err, results) {
			locals.data.nyheter = results;
			next(err);
		});
	});

	// Render the view
	view.render('index', {title: "Bakkefestivalen 2018"});
};

// module.exports = function (req, res) {
//   res.render('index', {title: "Bakkefestivalen 2018"});
// };