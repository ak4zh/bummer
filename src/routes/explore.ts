import { bummers } from '$lib/db';

/** @type {import('./__types/[id]').RequestHandler} */
export async function get({ url }) {
	const { data, error } = await bummers.all(url.searchParams.get('page') || 0);
	return {
		body: { bummers: data }
	};
}
