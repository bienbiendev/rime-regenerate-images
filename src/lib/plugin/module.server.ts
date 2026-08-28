import { definePlugin } from 'rimecms';
import { END_POINT, PLUGIN_NAME } from '../constants.js';
import { regenerate } from './regenerate.server.js';

export const regenerateImages = definePlugin(() => {
  return {
    name: PLUGIN_NAME,
    routes: {
      [END_POINT]: {
        POST: regenerate
      }
    }
  };
});
