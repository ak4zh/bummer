<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { user, userProfiles } from '$lib/db';
	import { onMount } from 'svelte';
	import { userProfile } from '$lib/utils/stores';
	
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

<div class="bg-slate-50 h-screen overflow-hidden">
	<div class="relative pt-6 pb-16 sm:pb-24">
		<NavBar />
		<slot />
	</div>
</div>
