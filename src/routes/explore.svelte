<script>
	export let bummers;
	console.log(bummers);
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-6">
	{#each bummers as bummer}
		<div class="bg-brand/20 p-6 rounded-full">
			<div class="text-center">
				<a href="/{bummer.username}" class="inline-flex">
					<h2 class="text-gray-800 text-3xl font-semibold underline decoration-dotted">{bummer.username}</h2>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
						/><path
							d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
						/></svg
					></a
				>
                <h4 class="text-lg">{bummer.full_name}</h4>
                <p>{bummer?.data?.bummers?.length || 0} bummers</p>
			</div>
		</div>
	{/each}
</div>
