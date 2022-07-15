<script lang="ts">
	import { session } from '$app/stores';
	export let dark: boolean;
</script>

<div>
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<nav
			class="relative flex flex-col sm:flex-row items-center sm:justify-between sm:h-10 gap-4"
			aria-label="Global"
		>
			<a
				href="/"
				class="!text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-500 dark:from-emerald-300 dark:to-emerald-400 text-5xl font-bold"
			>
				bummer
			</a>

			<div class="flex flex-row gap-4 justify-center items-center">
				<button class="" on:click={() => (dark = !dark)}>
					{#if dark}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
					{/if}
				</button>
				<a
					sveltekit:prefetch
					href="/dashboard"
					class="inline-flex items-center px-4 py-2 btn-primary"
				>
					Share your bummer
				</a>
				{#if $session.user && $session.user.id}
					<a href="/api/auth/logout">
						<button
							class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-slate-900 hover:bg-slate-700"
						>
							Sign Out
						</button>
					</a>
				{/if}
			</div>
		</nav>
	</div>
</div>
