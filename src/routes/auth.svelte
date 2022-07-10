<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import { auth, user } from '$lib/db';
	import { createQueryStore } from '$lib/utils/query';
	import toast from 'svelte-french-toast';
	import { Toaster } from 'svelte-french-toast';

	let loading = false;
	const regQuery = createQueryStore('reg');
	let isSignIn: boolean = $regQuery ? false : true;
	$: authText = isSignIn ? 'Log in to your account' : 'Create a new account';
	$: authButtonText = isSignIn ? 'Log In' : 'Sign Up';
	$: authToggleText = isSignIn ? 'create a new account' : 'login to existing account';
	$: if (browser && $user) {
		goto('/dashboard');
	}
	let email: string, password: string;
	function toggleView() {
		isSignIn = !isSignIn;
		if (isSignIn) {
			regQuery.unset();
		} else {
			regQuery.set(true);
		}
	}
	async function signUpOrSignIn() {
		loading = true;
		if (isSignIn) {
			const { error, session } = await auth.signIn({
				email,
				password
			});
			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Signed in successfully');
			}
		} else {
			const { error, session } = await auth.signUp({
				email,
				password
			});
			if (error) {
				toast.error(error.message);
			} else {
				toast.success('Created account successfully');
			}
		}
		loading = false;
	}
</script>

<Toaster />
<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<h2 class="mt-6 text-center text-3xl font-extrabold">{authText}</h2>
		<p class="mt-2 text-center text-sm text-white">
			Or
			<button class="font-medium text-brand/80 hover:text-brand/100" on:click={() => toggleView()}
				>{authToggleText}</button
			>
		</p>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-brand/30 dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 text-white">
			<form class="space-y-6" on:submit|preventDefault={signUpOrSignIn}>
				<div>
					<label for="email" class="block text-sm font-medium "> Email address </label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							bind:value={email}
							required
							class="text-black  first-line:appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium "> Password </label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							bind:value={password}
							class="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
						/>
						<label for="remember-me" class="ml-2 block text-sm"> Remember me </label>
					</div>

					<div class="text-sm">
						<a href="#" class="font-medium text-brand/80 hover:text-brand/100">
							Forgot your password?
						</a>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="btn bg-brand/80 hover:bg-brand/100 w-full py-2 px-4 rounded-md shadow-sm font-medium"
						>{authButtonText}</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
