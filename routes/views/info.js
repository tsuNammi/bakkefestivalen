var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'info';

	// Render the view
	view.render('info', {
		title: "Info - Bakkefestivalen 2018",
		metaImage: "https://bakkefestivalen.no/images/kart2.png",
		metaDescription: "Informasjon om festivaldagen."
	});
};

// module.exports = function (req, res) {
//   res.render('info', {title: "Info - Bakkefestivalen 2018"});
// };