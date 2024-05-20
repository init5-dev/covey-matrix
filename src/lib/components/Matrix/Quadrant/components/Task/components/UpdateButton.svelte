<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { DownloadOutline } from 'flowbite-svelte-icons';
	import type { ITask } from '$lib/types';
	import { uniqid } from '$lib/utils/uniqid';

	export let task: ITask;
	export let onUpdate: (task: ITask) => void;
</script>

<button
	id={uniqid()}
	on:click={(e) => {
		e.preventDefault;
		onUpdate(task);
	}}
	class={`transparent-button task-${task.id}-component`}
>
	<DownloadOutline />
</button>
