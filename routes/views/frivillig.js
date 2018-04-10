var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'frivillig';

	// Render the view
	view.render('frivillig', {title: "Frivillig - Bakkefestivalen 2018"});
};

// module.exports = function (req, res) {
//   res.render('frivillig', {title: "Frivillig - Bakkefestivalen 2018"});
// };