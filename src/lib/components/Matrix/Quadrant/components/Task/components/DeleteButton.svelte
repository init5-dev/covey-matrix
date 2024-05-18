<script lang="ts">
	import { Button } from 'flowbite-svelte';
  import {TrashBinOutline} from 'flowbite-svelte-icons'
	import type { ITask } from "$lib/types";

	export let confirmDelete: () => void
</script>

<button
	on:click={() => {
		confirmDelete();
	}}
	class='transparent-button'
>
	<TrashBinOutline />
</button>