<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask, TRelevance } from '$lib/types';
	import Relevance from './components/Relevance.svelte';
	import UpdateButton from './components/UpdateButton.svelte';
	import { onMount } from 'svelte';
	import Hours from './components/Hours.svelte';

	export let task: ITask;
	export let focus: boolean = false;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	let updating = false;
	let error = '';

	let { id, description, important, urgent, hours } = task;

	onMount(() => {
		const inputEl = document.getElementById('description-input');

		if (inputEl) {
			focus && inputEl.focus();
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

	$: (() => {
		const inputEl = document.getElementById('description-input')

		if (inputEl) {
			inputEl.focus()
		}
	})()
</script>

<form
	id={String(id)}
	on:focusout={() => {
		focus = false;
	}}
	class={`task-container ${updating && `border border-gray-200 ${focus ? 'border border-solid ' : 'border border-dashed'}`}`}
>
	<div class="flex gap-4">
		<input
			id="description-input"
			type="text"
			bind:value={description}
			on:keyup={() => {
				task.description !== description ? (updating = true) : null;
				updating=true
				focus=true
				error = '';
			}}
			on:focusin={() => {
				focus = true;
				updating=true
				task.description !== description ? (updating = true) : null;
			}}
		/>
		<div class="section">
			<span class="text-center">Important</span>
			<Relevance
				size={3}
				value={important}
				onSelect={selectImportance}
				setFocus={() => {
					focus = true;
				}}
			/>
		</div>
		<div class="section">
			<span class="text-center">Urgent</span>
			<Relevance
				size={3}
				value={urgent}
				onSelect={selectUrgency}
				setFocus={() => {
					focus = true;
				}}
			/>
		</div>
		<div class="section">
			<span class="text-center">Hours</span>
			<Hours
				hours={String(hours)}
				onChange={(value) => {
					console.log(hours, value);
					hours = value;
				}}
			/>
		</div>
		<UpdateButton
			{task}
			onUpdate={() => {
				if (!description) {
					error = 'Write the task description';
					focus = true
					return
				}

				updating = false;
				onUpdate({
					id,
					description,
					important,
					urgent,
					hours
				});
			}}
		/>
		<DeleteButton {task} {onDelete} />
	</div>
	{#if error}
		<strong class="ml-3 p-0 text-sm text-red-300">{error}</strong>
	{/if}
</form>

<style lang="postcss">
	.task-container {
		@apply w-full text-sm p-4;
	}

	.section {
		@apply flex flex-col items-center gap-2;
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
