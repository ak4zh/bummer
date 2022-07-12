<script>
	import Resume from '$lib/components/templates/Resume.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import reporter from '@felte/reporter-tippy';
	import { userProfile } from '$lib/utils/stores';
	import { bummers, user, userProfiles } from '$lib/db';
	import { Toaster } from 'svelte-french-toast';
	import toast from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { reporter as reporterComp, ValidationMessage } from '@felte/reporter-svelte';

	onMount(async () => {
		const { data } = await userProfiles.get();
		userProfile.set(data[0]);
	});

	const defaultBummer = [{ description: '', year: 2022, type: '' }];
	const schema = yup.object({
		full_name: yup.string().required(),
		data: yup.object().shape({
			bio: yup.string().required(),
			bummers: yup.array().of(
				yup.object().shape({
					year: yup.number().required().min(1900).max(2099),
					description: yup.string().required()
				})
			)
		})
	});

	function removeBummer(index) {
		return () => unsetField(`data.bummers.${index}`);
	}

	function addBummer() {
		return () => addField(`data.bummers`, defaultBummer[0], $formData.data.bummers.length);
	}

	const {
		form: usernameForm,
		data: usernameFormData,
		errors: usernameErrors
	} = createForm({
		extend: reporterComp,
		onSubmit: async (values) => {
			const { data, error } = await userProfiles.update(values);
			if (error) {
				toast.error('Username already taken.');
			} else {
				toast.success('Username updated.');
				$userProfile.username = values.username;
			}
		}
	});
	const {
		form,
		data: formData,
		errors: formErrors,
		addField,
		unsetField
	} = createForm({
		initialValues: {
			username: '',
			full_name: '',
			data: {
				bio: '',
				bummers: []
			}
		},
		extend: [reporter(), validator({ schema })],
		onSubmit: async (values) => {
			delete values['username'];
			const { data, error } = await userProfiles.update(values);
			if (data.length > 0) {
				toast.success('Profile updated...');
			}
		},
		onSuccess(response, context) {
			// Do something with the returned value from `onSubmit`.
		},
		onError(err, context) {
			// Do something with the error thrown from `onSubmit`.
		}
	});

	$: if ($userProfile?.username) {
		$formData.username = $userProfile.username;
		currentUsername = currentUsername ? currentUsername : $userProfile.username;
	}
	$: if ($userProfile?.full_name && !$formData.full_name) {
		$formData.full_name = $userProfile.full_name;
	}
	$: if ($userProfile?.data?.bio && !$formData.data?.bio) {
		$formData.data.bio = $userProfile.data.bio;
	}
	$: if (!$formData.data?.bummers?.length) {
		$formData.data.bummers = $userProfile?.data?.bummers || [];
	}

	let currentUsername;
</script>

<Toaster />

<div class="max-w-7xl mx-auto flex flex-col gap-4">
	<form
		use:usernameForm
		class="mt-1 mx-auto max-w-5xl flex flex-col sm:flex-row rounded-full shadow-sm gap-4 bg-slate-50 p-6"
	>
		<div class="flex">
			<span
				class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 text-gray-500 text-sm"
				>https://bummer.me/</span
			>
			<input
				bind:value={currentUsername}
				type="text"
				name="username"
				class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
				placeholder="username"
			/>
		</div>
		<button class="flex-shrink-0 bg-brand/70 px-4 py-2 rounded-xl text-white" type="submit"
			>Set username</button
		>
	</form>

	{#await $userProfile}
		<p>Loading...</p>
	{:then}
		{#if $userProfile?.username}
			<div class="flex flex-col lg:flex-row max-h-screen h-screen mt-4">
				<div class="lg:overflow-y-auto lg:w-96 w-full lg:h-4/5">
					<form use:form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2">
						<div class="mb-4">
							<label class="block text-gray-700 text-sm font-bold mb-2" for="full_name">
								Full Name
							</label>
							<input
								bind:value={$formData.full_name}
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="full_name"
								type="text"
								placeholder="Full Name"
							/>
						</div>
						<div class="mb-4">
							<label class="block text-gray-700 text-sm font-bold mb-2" for="data.bio">
								About me
							</label>
							<textarea
								bind:value={$formData.data.bio}
								class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="data.bio"
								placeholder="About me"
							/>
						</div>
						<div class="flex flex-col w-full mx-auto items-center justify-center">
							{#if $formData?.data && $formData?.data?.bummers}
								{#each $formData?.data?.bummers as bummer, index}
									<div class="flex gap-2 rounded-xl bg-brand/20 p-4 m-4 w-full justify-between">
										<div class="flex flex-col gap-4 w-full">
											<input
												bind:value={$formData.data.bummers[index].year}
												maxlength="4"
												type="number"
												pattern="[0-9]{4}"
												name="data.bummers.{index}.year"
												placeholder="Year"
											/>
											<textarea
												bind:value={$formData.data.bummers[index].description}
												name="data.bummers.{index}.description"
												placeholder="bummer summary"
											/>
										</div>
										<button type="button" on:click={removeBummer(index)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-6 w-6 bg-red-200 rounded-full"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
								{/each}
							{/if}
							<button
								type="button"
								on:click={addBummer()}
								class="bg-green-200 rounded-full py-2 px-4 hover:bg-green-300"
							>
								<div class="flex gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 bg-green-200 rounded-full"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>Add Bummer</span>
								</div>
							</button>
						</div>
						<button
							class="mx-auto w-full bg-brand/50 hover:bg-brand/40 rounded-full py-2 px-4 mb-8"
							type="submit">Save</button
						>
					</form>
				</div>
				<div class="lg:overflow-y-auto lg:flex-1 w-full lg:h-4/5">
					<Resume bind:content={$formData} />
				</div>
			</div>
		{/if}
	{/await}
</div>
