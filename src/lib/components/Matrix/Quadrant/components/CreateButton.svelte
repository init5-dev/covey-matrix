<script lang="ts">
	import { PlusOutline } from 'flowbite-svelte-icons';

	export let disabled = false
	export let onCreate: () => void;
</script>

<button
	type="submit"
	on:click={() => {
		onCreate();
	}}
	class={`transparent-button w-40 h-10 ${disabled && 'inactive-transparent-button'}`}
>
	<PlusOutline />
	Create task
</button>
