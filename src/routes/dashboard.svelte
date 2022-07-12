<script>
    import Resume from "$lib/components/templates/Resume.svelte";
    import { createForm } from 'felte';
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup';
    import reporter from '@felte/reporter-tippy';
    import { userProfile } from "$lib/utils/stores";
    import { bummers, userProfiles } from "$lib/db";
    import { Toaster } from "svelte-french-toast";
	import toast from 'svelte-french-toast';
    
    const defaultBummer = { description: '', year: 2022, type: ''}
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
        return () => addField(`data.bummers`, defaultBummer, $formData.data.bummers.length);
    }

    const {form: usernameForm, errors: usernameErrors } = createForm({
        validate: async (values) => {
            const {data, error} = await bummers.taken(values.username)
            console.log($usernameErrors)
            if (data.length > 0) {
                $usernameErrors.username = ['Username already taken.']
            }
        },
        onSubmit: async (values) => {
            const {data, error} = await userProfiles.update(values);
            if (data.length > 0) {
                toast.success('Username updated.')
            }
        },        
    })
    const { form, data: formData, errors: formErrors,  addField, unsetField } = createForm({
        initialValues: {
            full_name: '',
            data: {
                bio: '',
                bummers: []
            }
        },
        extend: [reporter(), validator({ schema })], 
        onSubmit: async (values) => {
            const {data, error} = await userProfiles.update(values);
            if (data.length > 0) {
                toast.success('Profile updated...')
            }
        },
        onSuccess(response, context) {
            // Do something with the returned value from `onSubmit`.
        },
        onError(err, context) {
            // Do something with the error thrown from `onSubmit`.
        },

    })

    $: if ($userProfile?.full_name && !$formData.full_name) {$formData.full_name = $userProfile.full_name}
    $: if ($userProfile?.data?.bio && !$formData.data?.bio) {$formData.data.bio = $userProfile.data.bio}
    $: if (!$formData.data?.bummers) {$formData.data.bummers = $userProfile.data?.bummers?.length || defaultBummer}

</script>

<Toaster />

<div class="max-w-7xl mx-auto flex flex-col gap-4">
    <div class="flex bg-brand/30 mx-auto p-6 rounded-xl gap-4">
        <form use:usernameForm>
            <input name="username" placeholder="username" type="text"/>
            <button class="bg-slate-900 text-white py-2 px-4 rounded-xl" type="submit">Save</button>    
        </form>
    </div>

    {#await $userProfile}
        <p>Loading...</p>
    {:then}
        <div class="flex flex-col lg:flex-row max-h-screen h-screen mt-4">
            <div class="lg:overflow-y-auto lg:w-96 w-full lg:h-4/5">
                <form use:form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="full_name">
                            Full Name
                        </label>
                        <input bind:value={$formData.full_name} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="full_name" type="text" placeholder="Full Name">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="data.bio">
                            About me
                        </label>
                        <textarea bind:value={$formData.data.bio} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="data.bio" placeholder="About me"></textarea>
                    </div>
                    <div class="flex flex-col w-full mx-auto items-center justify-center">
                        {#if $formData?.data && $formData?.data?.bummers}
                            {#each $formData?.data?.bummers as bummer, index}
                                <div class="flex gap-2 rounded-xl bg-brand/20 p-4 m-4 w-full justify-between">
                                    <div class="flex flex-col gap-4 w-full">
                                        <input bind:value={$formData.data.bummers[index].year} maxlength="4" type="number" pattern="[0-9]{4}" name="data.bummers.{index}.year" placeholder="Year" />
                                        <textarea bind:value={$formData.data.bummers[index].description} name="data.bummers.{index}.description" placeholder="bummer summary"></textarea>
                                    </div>
                                    <button type="button" on:click="{removeBummer(index)}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-red-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            {/each}
                        {/if}
                        <button type="button" on:click="{addBummer()}" class="bg-green-200 rounded-full py-2 px-4 hover:bg-green-300">
                            <div class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-green-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Add Bummer</span>
                            </div>
                        </button>
                    </div>
                    <button class="mx-auto w-full bg-brand/50 hover:bg-brand/40 rounded-full py-2 px-4 mb-8" type="submit">Save</button>
                </form>
            </div>
            <div class="lg:overflow-y-auto lg:flex-1 w-full lg:h-4/5">
                <Resume bind:content={$formData}/>
            </div>
        </div>    
    {/await}

</div>
