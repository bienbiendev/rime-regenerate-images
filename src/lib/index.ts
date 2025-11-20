import { definePluginClient } from 'rimecms/core/plugins/index.js';
import HeaderButton from './HeaderButton.svelte';

export const regenerateImagesClient = definePluginClient(() => {
	return {
		name: 'regenerateImagesClient',
		type: 'client',
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
