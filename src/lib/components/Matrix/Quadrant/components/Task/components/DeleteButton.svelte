<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
	import type { ITask } from '$lib/types';
	import { uniqid } from '$lib/utils/uniqid';

	export let task: ITask;
	export let confirmDelete: () => void;
</script>

<button
	id={uniqid()}
	on:click={() => {
		confirmDelete();
	}}
	class={`transparent-button task-${task.id}-component`}
>
	<TrashBinOutline />
</button>
