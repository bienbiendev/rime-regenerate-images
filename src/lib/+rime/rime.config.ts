import { regenerateImagesClient } from '$lib/index.js';
import { regenerateImages } from '$lib/index.server.js';
import { Collection, rime } from '$rime/config';
import { text } from 'rimecms/fields';
import { adapterSqlite } from 'rimecms/sqlite';

const Pages = Collection.create('pages', {
	panel: {
		group: 'content'
	},
	fields: [text('title').isTitle()]
});

const Medias = Collection.create('medias', {
	upload: true,
	panel: {
		group: 'content'
	},
	fields: [text('alt').isTitle()]
});

const config = rime({
	$adapter: adapterSqlite('regenerate.sqlite'),
	collections: [Pages, Medias],
	$plugins: [regenerateImages()],
	plugins: [regenerateImagesClient()]
});

export default config;
