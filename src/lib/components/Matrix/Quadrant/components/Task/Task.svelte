<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask, TRelevance } from '$lib/types';
	import Relevance from './components/Relevance.svelte';
	import UpdateButton from './components/UpdateButton.svelte';
	import { onMount } from 'svelte';

	export let task: ITask;
	export let focus: boolean = false;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	let updating = false;

	let {id, description, important, urgent, hours} = task

	$: console.log(`FOCUS: ${focus}`);

	onMount(() => {
		if (focus) {
			console.log('FOCUS')
		}
		const inputEl = document.getElementById('description-input')

		if (inputEl) {
			focus && inputEl.focus()
		}
	});

	const selectImportance = (value: number) => {
		important = value as TRelevance;
		updating = true;
	};

	const selectUrgency = (value: number) => {
		urgent = value as TRelevance;
		updating = true;
	};
</script>

<form 
id={String(id)} 
on:focusout={()=>{
	focus = false
}}
class={`stars ${updating && `border border-gray-200 ${focus ? 'border border-solid ' : 'border border-dashed'}`}`}>
	<input
		id="description-input"
		type="text"
		bind:value={description}
		on:keypress={() => {
			task.description !== description ? updating = true: null;
		}}
		on:focusin={() => {
			focus = true
			task.description !== description ? updating = true: null;
		}}
	/>
	<div class="flex flex-col items-center">
		<span class="text-center">Important</span>
		<Relevance size={3} value={important} onSelect={selectImportance} setFocus={()=>{focus = true}}/>
	</div>
	<div class="flex flex-col items-center">
		<span class="text-center">Urgent</span>
		<Relevance size={3} value={urgent} onSelect={selectUrgency} setFocus={()=>{focus = true}}/>
	</div>
	<UpdateButton {task} onUpdate={()=> {
		updating = false
		onUpdate({
			id,
			description,
			important,
			urgent,
			hours
		})
	}} />
	<DeleteButton {task} {onDelete} />
</form>

<style lang="postcss">
	.stars {
		@apply flex h-16 w-full items-center gap-2;
	}

	input {
		@apply w-full rounded border-none bg-transparent text-white ring-0;
	}

	input:focus,
	input:active,
	input:hover {
		@apply border-none ring-0;
	}
</style>
