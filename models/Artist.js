var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * artist Model
 * ==========
 */

var Artist = new keystone.List('Artist', {
	schema: { collection: 'artister' },
  plural: 'Artister',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Artist.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	thumbnail: { type: Types.CloudinaryImage, folder: 'artister/thumbnails/' },
	image: { type: Types.CloudinaryImage, folder: 'artister/' },
	imageCredit: { type: String },
	youtubeLink: { type: String },
	brief: { type: Types.Html, wysiwyg: true, height: 150 },
	content: { type: Types.Html, wysiwyg: true, height: 400 }
});

Artist.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Artist.register();
