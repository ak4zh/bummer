<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { user, userProfiles } from '$lib/db';
	import { onMount } from 'svelte';
	import { userProfile } from '$lib/utils/stores';
	import { loading } from '$lib/utils/stores';
	import 'tippy.js/dist/tippy.css';
	import Loader from '$lib/components/Loader.svelte';

	$: {
		if (browser) {
			if (!['/', '/auth'].includes($page.url.pathname) && !$user) {
				goto('/auth');
			}
		}
	}

	onMount(async () => {
		const {data} = await userProfiles.get();
		userProfile.set(data[0])
	})
</script>

<div class="bg-slate-50 min-h-screen h-full bg-wave">
	<div class="relative pt-6 pb-16 sm:pb-24">
		<NavBar />
		{#if $navigating || $loading}
			<Loader />
		{/if}
		<slot />
	</div>
</div>
