<script>
	import Resume from '$lib/components/templates/Resume.svelte';
	export let content;
</script>

{#if content}
	<Resume {content} />
{:else}
	<main class="mt-16 sm:mt-24 h-full">
		<div class="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6">
			<div class="text-center">
				<h1
					class="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
				>
					<span class="block">Let's fail to hide</span>
					<span class="text-emerald-400">our failures</span>
				</h1>
				<p class="mt-5 text-sm md:text-lg lg:text-xl">Your failures are probably as interesting as your accomplishments.</p>
				<div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
					<div class="rounded-md shadow">
						<a sveltekit:prefetch href="/explore" class="btn-secondary btn-large"> Explore bummer stories </a>
					</div>
				</div>
			</div>
		</div>
	</main>
{/if}
