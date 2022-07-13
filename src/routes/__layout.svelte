<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { user, userProfiles } from '$lib/db';
	import { loading } from '$lib/utils/stores';
	import 'tippy.js/dist/tippy.css';
	import Loader from '$lib/components/Loader.svelte';

	$: {
		if (browser) {
			if (['/dashboard'].includes($page.url.pathname) && !$user) {
				goto('/auth');
			}
		}
	}
</script>

<div class="bg-slate-50 bg-wave min-h-screen">
	<div class="relative pt-6 pb-16 sm:pb-24 max-w-5xl mx-auto">
		<NavBar />
		{#if $navigating || $loading}
			<Loader />
		{/if}
		<slot />
	</div>
</div>
