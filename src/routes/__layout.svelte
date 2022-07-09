<script>
    import '../app.css';
    import Background from "$lib/components/Background.svelte";
    import NavBar from "$lib/components/NavBar.svelte";
    
</script>

<div class="bg-wave h-screen overscroll-contain">
    <div class="relative  text-slate-50 overflow-hidden">
    
        <div class="relative pt-6 pb-16 sm:pb-24">
            <NavBar />
            <slot />
        </div>
    </div>    
</div>

