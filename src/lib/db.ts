import { get } from 'svelte/store';
import { loading } from './utils/stores';
import { createSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { session } from '$app/stores';

const dbAPI = async (query) => {
	return await query;
};

const Loader = (fn) => {
	return async function (query) {
		loading.set(true);
		const { data, error } = await query;
		loading.set(false);
		return { data, error };
	};
};

const AuthLoader = (fn) => {
	return async function (query) {
		loading.set(true);
		const { error, session } = await query;
		loading.set(false);
		return { error, session };
	};
};

const loaderQuery = Loader(dbAPI);
const authLoaderQuery = AuthLoader(dbAPI);

const { supabaseClient } = createSupabaseClient(
	import.meta.env.VITE_SUPABASE_URL as string,
	import.meta.env.VITE_SUPABASE_ANON_KEY as string
);
export { supabaseClient };

export async function signOut() {
	await supabaseClient.auth.signOut();
}

export const auth = {
	async signIn(data: object) {
		const query = supabaseClient.auth.signIn(data);
		return await authLoaderQuery(query);
	},

	async signUp(data: object) {
		const query = supabaseClient.auth.signUp(data);
		return await authLoaderQuery(query);
	},

	async signOut() {
		return await supabaseClient.auth.signOut();
	}
};

export const userProfiles = {
	async get() {
		const query = supabaseClient.from('user_profiles').select(`
			username,
			full_name,
			view_count,
			data
		`);
		return await loaderQuery(query);
	},

	async update(userId: string, data) {
		const query = supabaseClient
			.from('user_profiles')
			.update(data)
			.match({ id: userId });
		return await loaderQuery(query);
	}
};

export const getPagination = (page: number, size: number) => {
	const limit = size ? +size : 50;
	const from = page ? page * limit : 0;
	const to = page ? from + size : size;
	return { from, to };
};

export const bummers = {
	async get(username: string) {
		const query = supabaseClient.from('bummers').select('*').eq('username', username);
		return await loaderQuery(query);
	},
	async taken(username: string) {
		const query = supabaseClient.from('bummers').select('username').eq('username', username);
		return await loaderQuery(query);
	},
	async all(page = 0) {
		const { from, to } = getPagination(page, 50);
		const query = supabaseClient
			.from('bummers')
			.select('*')
			.order('view_count', { ascending: false })
			.range(from, to);
		return await loaderQuery(query);
	}
};
