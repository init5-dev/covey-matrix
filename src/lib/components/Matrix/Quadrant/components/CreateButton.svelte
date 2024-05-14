<script lang="ts">
  import {PlusOutline} from 'flowbite-svelte-icons'
	import type { ITask } from "$lib/types";

	export let onCreate: () => void
</script>

<button
	on:click={() => {
		 onCreate();
	}}
	class='transparent-button'
>
	<PlusOutline />
</button>