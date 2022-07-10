<script>
    import Resume from "$lib/components/templates/Resume.svelte";
    import { createForm } from 'felte';
    import { validator } from '@felte/validator-yup';
    import * as yup from 'yup';
    import reporter from '@felte/reporter-tippy';
    import { userProfile } from "$lib/utils/stores";

    let content = $userProfile || {}
    $: content = $formData
    console.log(content)
    const schema = yup.object({
        username: yup.string().required().min(5),
        password: yup.string().required(),
    });

    $: bummers = $formData.data.bummers;
    $: console.log(bummers)
    function removeBummer(index) {
        return () => unsetField(`data.bummers.${index}`);
    }

    function addBummer() {
        return () => addField(`data.bummers`, { description: '', year: '', type: ''}, $formData.data.bummers.length);
    }

    const { form, data: formData, addField, unsetField } = createForm({
        initialValues: {
            data: {
                bummers: [{ description: '', year: '', type: ''}],
            }
        },
        extend: [reporter(), validator({ schema })], 
        onSubmit: (values) => {
            console.log(values)
        },
        onSuccess(response, context) {
            
        // Do something with the returned value from `onSubmit`.
        },
        onError(err, context) {
        // Do something with the error thrown from `onSubmit`.
        },
        validate: async (values) => {
            const errors = {}
            if (!values.email || !/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(values.email)) {
            errors.email = 'Must be a valid email';
            }
            if (!values.password) errors.password = [
            'Must not be empty',
            'Must be over 8 characters',
            ];
            if (values.password && values.password.length < 8) {
            errors.password = ['Must be over 8 characters'];
            }
            return errors;
        },
    })
</script>

<div class="max-w-7xl mx-auto md:flex">
    <div class="md:overflow-y-auto md:w-96 w-full">
        <form use:form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input bind:value={content.username} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="full_name">
                    Full Name
                </label>
                <input bind:value={content.full_name} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="full_name" type="text" placeholder="Full Name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="bio">
                    About me
                </label>
                <textarea bind:value={content.data.bio} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bio" placeholder="About me"></textarea>
            </div>
            <div class="flex flex-col w-full mx-auto items-center justify-center">
                {#each bummers as bummer, index}
                    <div class="flex gap-2 rounded-xl bg-brand/20 p-4 m-4 w-full">
                        <div class="flex flex-col gap-4 w-5/6">
                            <input maxlength="4" type="text" pattern="[0-9]{4}" name="data.bummers.{index}.year" placeholder="Year" />
                            <textarea name="data.bummers.{index}.description" placeholder="bummer summary"></textarea>
                        </div>
                        <button type="button" on:click="{removeBummer(index)}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 bg-red-200 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                {/each}
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
    <div class="md:flex-1 md:overflow-y-auto">
        <Resume bind:content={content}/>
    </div>
</div>