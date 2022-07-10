import { bummers } from "$lib/db";

/** @type {import('./__types/[id]').RequestHandler} */
export async function get({ params }) {
	const { data } = await bummers.get(params.username);
	if (data?.length === 1) {
		const content = data[0];
		return {
			body: { content }
		};
	}

	return {
		status: 404
	};
}
