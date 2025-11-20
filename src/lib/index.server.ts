import { json, type RequestEvent } from '@sveltejs/kit';
import { definePlugin } from 'rimecms';
import type { GenericDoc, UploadDoc } from 'rimecms/types';
import HeaderButton from './HeaderButton.svelte';

export const regenerateImages = definePlugin(() => {
	const regenerate = async (event: RequestEvent) => {
		// get params
		const params = event.url.searchParams;
		const slug = params.get('slug');
		const id = params.get('id');
		if (!slug) {
			throw new Error('missing slug param');
		}
		// check if it's a collection
		const isCollection = event.locals.rime.config.isCollection(slug);
		if (!isCollection) {
			throw new Error(`${slug} is not a collection`);
		}
		// get the related collection api
		const collectionAPI = event.locals.rime.collection(slug);

		// check if it's an upload collection
		const config = collectionAPI.config;
		if (!config.upload) {
			throw new Error(`${slug} is not an upload collection`);
		}

		let documents: UploadDoc[];
		if (!id) {
			// no id provided get all documents
			documents = (await collectionAPI.find({})) as UploadDoc[];
		} else {
			// if id provided process only one document
			const document = (await collectionAPI.findById({ id })) as UploadDoc;
			documents = [document];
		}

		let processed = 0;

		const processImage = async (document: UploadDoc) => {
			// check if document is an image
			if (!document.mimeType) return;
			if (document.mimeType.includes('image')) {
				try {
					event.locals.rime.logger.info(
						`[regenerateImages] process ${document.filename} - ${document.id}`
					);
					// Get the image
					await fetch(`${process.env.PUBLIC_RIME_URL}/medias/${document.filename}`)
						.then((response) => response.blob())
						.then(async (blob) => {
							// convert the response to a file object
							const file = new File([blob], document.filename, { type: blob.type });
							// add it to the data
							const data: Partial<GenericDoc> = {
								file
							};
							// Update the document with its own file so file are regenerated
							await collectionAPI.updateById({
								data,
								id: document.id
							});
							// count
							processed += 1;
						});
				} catch (err) {
					console.log(err);
				}
			} else {
				event.locals.rime.logger.info(
					`[regenerateImages] skip ${document.filename} - ${document.id} : not an image`
				);
			}
		};

		await Promise.all(documents.map((doc) => processImage(doc)));

		return json({ message: `${processed}/${documents.length} documents regenerated` });
	};

	return {
		name: 'regenerateImages',
		type: 'server',
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
		},

		routes: {
			'/api/regenerate_images': {
				POST: regenerate
			}
		}
	};
});
