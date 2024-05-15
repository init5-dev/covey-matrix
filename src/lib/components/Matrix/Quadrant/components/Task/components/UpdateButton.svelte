<script lang="ts">
	import { Button } from 'flowbite-svelte';
  import {DownloadOutline} from 'flowbite-svelte-icons'
	import type { ITask } from "$lib/types";

	export let task: ITask
	export let onUpdate: (task: ITask) => void
</script>

<button
	on:click={() => {
		onUpdate(task);
	}}
	class='transparent-button'
>
	<DownloadOutline />
</button>