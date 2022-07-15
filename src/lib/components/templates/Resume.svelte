<script>
	import groupBy from '$lib/utils/groupBy';
	export let content;
</script>

<div class="p-4 bg-gray-100 dark:bg-gray-800 mx-auto font-light rounded-3xl max-w-5xl border-8 border-emerald-200">
	<section class="text-gray-300 flex flex-col items-center justify-center">
		<!-- style="height: 50vh" -->
		<div class="flex flex-col items-center justify-center text-center">
			<h1 class="text-3xl sm:text-4xl lg:text-6xl text-gray-500">{content?.full_name}</h1>
			<h2 class="font-light text-xl sm:text-3xl lg:text-5xl">
				{content?.data?.credential || 'Human'}
			</h2>
		</div>
	</section>
	<div
		class="flex flex-col justify-center text-md md:text-xl font-bold tracking-widest text-gray-300 text-center mt-6"
	>
		<h1>
			<span class="text-xs">bummer.me/</span><span class="text-2xl md:text-3xl text-brand/80"
				>{content?.username || 'username'}</span
			>
		</h1>
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
		<div class="md:border-l-2 pl-4 p-2 col-span-2 text-justify md:w-1/2 mt-10 md:mt-0 break-words">
			<p>
				{content?.data?.bio || 'About me'}
			</p>
		</div>
	</div>

	<div class="grid col-span-1 md:flex items-center justify-center">
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

	<div class="w-full">
		{#each Object.entries(groupBy(content?.data?.bummers || [], 'type')) as [bummerType, bummers]}
			<div class="mt-6 text-center divide-y-4 divide-brand/70">
				<h1 class="font-bold italic mb-2 text-start">{bummerType}</h1>
				<div class="relative mt-5 text-left">
					{#each bummers.sort((a, b) => b.year - a.year).reverse() as bummer}
						<div class="flex items-center">
							<div class="hidden md:block w-20">
								<div class="font-bold italic">{bummer?.year}</div>
							</div>

							<div class="border-r-2 border-brand/50 absolute h-full left-1 md:left-20 top-2 z-10">
								<i class="fas fa-circle -top-1 -ml-2 absolute" />
							</div>

							<div class="ml-10 w-full break-words">
								<div class="md:hidden w-20">
									<div
										class="font-bold italic underline decoration-wavy decoration-brand/60 decoration-2"
									>
										{bummer?.year}
									</div>
								</div>
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
</div>
