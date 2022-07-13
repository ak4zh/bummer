<script>
	import groupBy from '$lib/utils/groupBy';
	export let content;
</script>

<div class="p-4 md:p-10 bg-gray-100 max-w-7xl mx-auto text-base font-light">
	<div
		class="flex flex-col justify-center text-xl font-bold tracking-widest text-gray-300 text-center"
	>
		<h1>
			<span
				class="text-xs">bummer.me/</span
			><span class="text-5xl text-brand/80">{content?.username || 'username'}</span>
		</h1>
		<p class="text-sm">Mistakes. Blunders. Screw-ups.</p>
		<h2 class="mt-8 text-3xl">{content?.full_name || 'Full Name'}</h2>
	</div>

	<div class="grid col-span-1 md:flex items-center mt-10 justify-center">
		<div class="mr-14">
			<img
				class="md:w-40"
				src="https://ui-avatars.com/api/?name={content?.full_name ||
					'Full Name'}&size=128&rounded=true"
				alt="Logo"
			/>
		</div>
		{#if content?.avatar}
			<div class="md:mr-4">
				<img class="md:w-40" src={content.avatar} alt={content.username} />
			</div>
		{/if}
		<div class="md:border-l-2 pl-4 p-2 col-span-2 text-justify md:w-1/2 mt-10 md:mt-0 break-all">
			<p>
				{content?.data?.bio || 'About me'}
			</p>
		</div>
	</div>

	<div class="grid col-span-1 md:flex items-center justify-center mt-20">
		<div>
			<div class="md:flex items-center mb-4">
				{#each content?.data?.contacts || [] as contact}
					<div class="flex items-center md:mr-8 mb-4 md:mb-0">
						<i class="fas fa-envelope-open-text fa-2x mr-2" />
						{#if contact?.url}
							<a href={contact.url}>{contact.title}</a>
						{:else}
							<p>{contact.title}</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
	{#each Object.entries(groupBy(content?.data?.bummers || [], 'type')) as [bummerType, bummers]}
		<div class="mt-6 text-center max-w-7xl divide-y-4 divide-brand/70">
			<h1 class="font-bold italic mb-2 text-start">{bummerType}</h1>
			<div class="relative mt-5 text-left">
				{#each bummers as bummer}
					<div class="flex items-center relative">
						<div class="hidden md:block w-20">
							<div class="font-bold italic">{bummer?.year}</div>
						</div>

						<div class="border-r-2 border-brand/50 absolute h-full left-1 md:left-20 top-2 z-10">
							<i class="fas fa-circle -top-1 -ml-2 absolute" />
						</div>

						<div class="ml-10 w-full break-all">
							<div class="mb-4 mt-4">
								{bummer.description}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
