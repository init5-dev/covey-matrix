<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask, TRelevance } from '$lib/types';
	import { Label, Rating } from 'flowbite-svelte';
	import Relevance from './components/Relevance.svelte';

	export let task: ITask;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	console.log('IMPORTANT:', task.important);

	const selectImportance = (value: number) => {
		task.important = value as TRelevance;
	};

	const selectUrgency = (value: number) => {
		task.urgent = value as TRelevance;
	};
</script>

<div class="flex h-16 w-full items-center gap-1 border border-gray-200">
	<input
		type="text"
		bind:value={task.description}
		on:change={() => {
			onUpdate(task);
		}}
	/>
	<div class="flex flex-col items-center">
		<span class="text-center">Important</span>
		<Relevance onSelect={selectImportance}/>
	</div>
	<div class="flex flex-col items-center">
		<span class="text-center">Urgent</span>
		<Relevance onSelect={selectUrgency}/>
	</div>
	<DeleteButton {task} {onDelete} />
</div>

<style lang="postcss">
	input {
		@apply w-full rounded border-none bg-transparent text-white ring-0;
	}

	input:focus {
		@apply border border-solid border-white;
	}
</style>
