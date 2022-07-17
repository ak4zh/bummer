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
		<div class="flex justify-center m-4">
          <a href="https://www.producthunt.com/posts/bummer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-bummer" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=352500&theme=light" alt="bummer - Let&#0039;s&#0032;fail&#0032;to&#0032;hide&#0032;our&#0032;failures | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
        </div>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
					<div class="rounded-md shadow">
						<a sveltekit:prefetch href="/explore" class="btn-secondary btn-large"> Explore bummer stories </a>
					</div>
				</div>
			</div>
		</div>
	</main>
{/if}
