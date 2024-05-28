<script lang="ts">
	import { PlusOutline } from 'flowbite-svelte-icons';

	export let onCreate: () => void;
</script>

<button
	type="submit"
	on:click={() => {
		onCreate();
	}}
	class={`transparent-button w-40 h-10`}
>
	<PlusOutline />
	Create task
</button>
