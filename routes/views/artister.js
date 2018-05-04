var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'artister';

	// Render the view
	view.render('artister', {
		title: "Program - Bakkefestivalen 2018",
		metaImage: "https://bakkefestivalen.no/images/program/program.png",
		metaDescription: "Program og oversikt over aktiviteter på festivaldagen."
	});
};

// module.exports = function (req, res) {
//   res.render('artister', {title: "Artister - Bakkefestivalen 2018"});
// };