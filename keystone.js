require('dotenv').config();

var keystone = require('keystone');
var ejs = require('ejs');
var utils = require('keystone-utils');

keystone.init({
  
  'name': 'Bakkefestivalen',
  
  'favicon': 'public/favicon.png',
  'less': 'public',
  'static': ['public'],
  
  'views': 'templates/views',
  'view engine': 'ejs',
  'custom engine': ejs.renderFile,
  
  'auto update': true,
  'mongo': 'mongodb://Keystone:bakken@localhost/bakkefestivalen/',
  
  'session': true,
  'session store': 'mongo',
  'auth': true,
  'user model': 'User',
  
});
 
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
 
keystone.set('routes', require('./routes'));
keystone.set('cloudinary secure', true);
keystone.set('name', 'Bakkefestivalen UI');
keystone.set('brand', 'Bakkefestivalen');

// Set host/port to listen on
keystone.set('port', 3001);
keystone.set('host', 'localhost');

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	nyheter: 'nyhets',
	artister: 'artists',
	users: 'users'
	
});
 
keystone.start();