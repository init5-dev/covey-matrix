<script lang="ts">
	import { Button } from 'flowbite-svelte';
  import {TrashBinOutline} from 'flowbite-svelte-icons'
	import type { ITask } from "../../../../types";

	export let task: ITask
	export let onDelete: (task: ITask) => void
</script>

<button
	on:click={() => {
		onDelete(task);
	}}
	class='transparent-button'
>
	<TrashBinOutline />
</button>