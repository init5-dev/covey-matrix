<script lang="ts">
	import { PlusOutline } from 'flowbite-svelte-icons';

	export let editMode: boolean
	export let onCreate: () => void;
</script>

<button
	type="submit"
	on:click={() => {
		onCreate();
	}}
	class={`${editMode ? 'inactive-transparent-button' : 'transparent-button'}`}
>
	<PlusOutline />
	Create task
</button>
