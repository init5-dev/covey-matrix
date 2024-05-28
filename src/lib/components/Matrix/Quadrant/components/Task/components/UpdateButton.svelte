<script lang="ts">
	import { DownloadOutline } from 'flowbite-svelte-icons';
	import type { ITask } from '$lib/types';
	import { uniqid } from '$lib/utils/uniqid';

	export let task: ITask;
	export let active = false
	export let update: (task: ITask) => void;
</script>

<button
	id={uniqid()}
	on:mousedown={() => {
		update(task);
	}}
	class={`${active ? 'transparent-button' : 'inactive-transparent-button'} task-${task.id}-component`}
>
	<DownloadOutline />
</button>
