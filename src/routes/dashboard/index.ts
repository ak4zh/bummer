import { session } from '$app/stores';
import { supabaseServerClient, withApiAuth } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from './__types/profile';

interface UserProfileTable {
	id: string;
	full_name: string;
	username: string;
	email: string;
	featured: boolean;
	public: boolean;
	view_count: number;
	data: Object;
	created_at: string;
}

interface GetOutput {
	user: User;
	data: TestTable[];
}

export const get: RequestHandler<GetOutput> = async ({ locals, request }) =>
	withApiAuth(
		{
			redirectTo: `/auth?redirectTo=/dashboard`,
			user: locals.user
		},
		async () => {
			const { data } = await supabaseServerClient(request)
				.from<UserProfileTable>('user_profiles')
				.select('*');
			return {
				body: {
					user: locals.user,
					data
				}
			};
		}
	);
