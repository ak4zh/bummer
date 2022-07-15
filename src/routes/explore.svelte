<script>
	export let bummers;
</script>

<div class="m-6">
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each bummers as bummer}
			<a sveltekit:prefetch href="/{bummer.username}">
				<div
					class="flex flex-col bg-gradient-to-b from-emerald-200 to-gray-50 dark:from-emerald-200 dark:to-gray-900 p-6 rounded-xl hover:shadow-xl shadow-emerald-900 dark:shadow-emerald-50"
				>
					<!-- <div class="flex justify-center">
						<img
							class="w-32 h-32"
							src="https://ui-avatars.com/api/?name={bummer?.full_name || 'Full Name'}&rounded=true"
							alt="Logo"
						/>
					</div> -->
					<div class="text-center">
						<div class="inline-flex">
							<h2
								class="text-gray-800 text-2xl font-semibold underline decoration-dotted text-center"
							>
								{bummer.username}
							</h2>
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
							>
						</div>
						<h4 class="text-md">{bummer.full_name}</h4>
						<p>{bummer?.data?.bummers?.length || 0} bummers</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
