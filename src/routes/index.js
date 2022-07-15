import { bummers } from '$lib/db';

/** @type {import('./__types/[id]').RequestHandler} */
export async function get({ url }) {
	let content;
	const hostChunk = url.host.split('.');
	if (hostChunk.length == 3) {
		let subDomain = hostChunk[0];
		const { data } = await bummers.get(subDomain);
		if (data?.length === 1) {
			content = data[0];
		}
	}
	return {
		body: { content }
	};
}
