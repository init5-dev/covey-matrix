<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask, TRelevance } from '$lib/types';
	import Relevance from './components/Relevance.svelte';
	import UpdateButton from "./components/UpdateButton.svelte";

	export let task: ITask;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	let updating = false

	$: console.log(`I: ${task.important} U: ${task.urgent}`)

	const selectImportance = (value: number) => {
		task.important = value as TRelevance;
		updating = true
	};

	const selectUrgency = (value: number) => {
		task.urgent = value as TRelevance;
		updating = true
	};
</script>

<div id={String(task.id)} class={`stars ${updating && 'border border-dashed border-gray-200'}`}>
	<input
		type="text"
		bind:value={task.description}
		on:keypress={() => {
			updating = true	
		}}
		on:focusin={() => {
			updating = true	
		}}
	/>
	<div class="flex flex-col items-center">
		<span class="text-center">Important</span>
		<Relevance size={3} value={task.important} onSelect={selectImportance}/>
	</div>
	<div class="flex flex-col items-center">
		<span class="text-center">Urgent</span>
		<Relevance size={3} value={task.urgent} onSelect={selectUrgency}/>
	</div>
	<UpdateButton {task} {onUpdate} />
	<DeleteButton {task} {onDelete} />
</div>

<style lang="postcss">
	.stars {
		@apply flex h-16 w-full items-center gap-2
	}


	input {
		@apply w-full rounded border-none bg-transparent text-white ring-0;
	}

	input:focus, input:active, input:hover {
		@apply border-none ring-0;
	}

</style>
