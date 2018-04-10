var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Nyhet Model
 * ==========
 */

var Nyhet = new keystone.List('Nyhet', {
	schema: { collection: 'nyheter' },
	plural: 'Nyheter',
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	track: true
});

Nyhet.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, note: 'Saken er kun synlig når en velger publisert.' },
	author: { type: Types.Relationship, ref: 'User', index: true, note: 'Har ikke så mye å si, men gjerne bruk den for å sette hovedansvarlig for nyheten.' },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, note: 'Sakene er sortert etter publiseringsdato.' },
	hovednyhet: { type: Boolean, initial: false, note: 'Tickes av når en vil en sak skal være på "jumbotronen" på hovedsiden. Er det flere ticket av, er det den som er publisert sist som blir valgt.' },
	thumbnail: { type: Types.CloudinaryImage, folder: 'nyheter/thumbnails/' },
	image: { type: Types.CloudinaryImage, folder: 'nyheter/' },
	imageCredit: { type: String, note: '"Thumbnail" brukes i nyhetsoversikter. Bør være widescreen (16:10), typ 500:333ish.<br>"Image" er bildet i selve nyhetssaken. Ikke krav til størrelsesforhold her, men ser nok bedre ut hvis den er widescreen.<br>"Image Credit" fylles ut hvis man trenger å gi fotografen credit. Dukker opp rett under hovednyhetsbildet.' },
	brief: { type: Types.Html, wysiwyg: true, height: 150, note: 'Brief er sammendrag for forsiden/nyhetsoversikten. Maks. 300-350 characters for at det skal se bra ut. NB! Copy-paste direkte fra en nettside kan ta med seg kode! Gjerne copypaste til Notepad/TextEdit før du kopierer inn her.' },
	content: { type: Types.Html, wysiwyg: true, height: 400, note: 'Content er selve teksten når du trykker inn på nyhetssaken. Inkluderer ikke det i fra brief. NB! Copy-paste direkte fra en nettside kan ta med seg kode! Gjerne copypaste til Notepad/TextEdit før du kopierer inn her.' }
});

Nyhet.defaultSort = '-publishedDate';
Nyhet.defaultColumns = 'title, state|15%, hovednyhet|15%, author|15%, publishedDate|15%';
Nyhet.register();
