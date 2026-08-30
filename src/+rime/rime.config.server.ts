import { regenerateImages } from '$lib/index.js';
import { Collection, rime } from '$rime/config';
import { adapterSqlite } from 'rimecms/adapter-sqlite';
import { text } from 'rimecms/fields';

const Pages = Collection.create('pages', {
  panel: {
    group: 'content'
  },
  fields: [text('title').isTitle()]
});

const Medias = Collection.create('medias', {
  upload: {
    imageSizes: [
      {
        width: 500,
        name: 'small',
        out: ['jpg']
      }
    ]
  },
  panel: {
    group: 'content'
  },
  fields: [text('alt').isTitle()]
});

const config = rime({
  $adapter: adapterSqlite('regenerate.sqlite'),
  collections: [Pages, Medias],
  plugins: [regenerateImages()]
});

export default config;
