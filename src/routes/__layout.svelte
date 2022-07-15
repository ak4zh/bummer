<script>
	import '../app.css';
	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { loading } from '$lib/utils/stores';
	import 'tippy.js/dist/tippy.css';
	import Loader from '$lib/components/Loader.svelte';

	const onUserUpdate = async (user) => {
		let redirectPath = $page.url.searchParams.get('redirectTo');
		if (user && redirectPath) {
			await goto('/').then(() => {
				goto(redirectPath);
			});
		}
	};

	// $: {
	// 	if ($session.user && $session.user.id) {
	// 		loadData();
	// 	}
	// }
	let dark = false;
</script>

<div class:dark class="">
	<SupaAuthHelper {supabaseClient} {session} {onUserUpdate}>
		<div class="dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen bg-wave">
			<div class="relative pt-6 pb-16 sm:pb-24 max-w-7xl mx-auto">
				<NavBar bind:dark />
				{#if $navigating || $loading}
					<Loader />
				{/if}
				<slot />
			</div>
		</div>
	</SupaAuthHelper>
</div>
