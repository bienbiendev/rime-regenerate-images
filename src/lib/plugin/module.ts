
import { definePlugin } from 'rimecms';
import { PLUGIN_NAME } from '../constants.js';
import HeaderButton from '../HeaderButton.svelte';

export const regenerateImages = definePlugin(() => {
	return {
		name: PLUGIN_NAME,
		configure: (config) => {
			config = {
				...config,
				panel: {
					...(config.panel || {}),
					components: {
						...(config.panel?.components || {}),
						collectionHeader: [...(config.panel?.components?.collectionHeader || []), HeaderButton]
					}
				}
			};
			return config;
		}
	};
});
