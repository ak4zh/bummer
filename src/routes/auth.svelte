<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import Auth from 'supabase-ui-svelte';
</script>

<div class="min-h-full flex flex-col justify-center py-12 m-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
	<Auth {supabaseClient} class={'text-gray-900 bg-gray-50 rounded-xl p-4'} />
</div>
