<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask } from '../../../types';

	export let task: ITask;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;
</script>

<div class="flex w-full gap-1 items-center h-10">
	<input class='task-input' type="text" bind:value={task.description} on:change={() => {onUpdate(task)}} />
	<DeleteButton {task} {onDelete} />
</div>

<style lang="postcss">
	input.task-input {
		@apply w-full bg-transparent ring-0 border-none text-white rounded
	}

	input.task-input:focus {
		@apply border border-solid border-white
	}
</style>