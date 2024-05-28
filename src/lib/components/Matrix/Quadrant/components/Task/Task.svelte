<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask, TRelevance, TStatus } from '$lib/types';
	import Relevance from './components/Relevance.svelte';
	import { uniqid } from '$lib/utils/uniqid';
	import Datetime from './components/Deadline.svelte';
	import UpdateButton from './components/UpdateButton.svelte';
	import type { IDialog } from '$lib/components/Dialog/types';
	import Dialog from '$lib/components/Dialog/Dialog.svelte';
	import Deadline from "./components/Deadline.svelte";

	export let ordinal: number
	export let task: ITask;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	let unchangedTask = { ...task };
	let changing = false;

	$: console.log(JSON.stringify(task, null, 2));

	let error = '';
	let dialog: IDialog = {
		open: false,
		title: 'Confirm deletion',
		message: 'Do you wanna delete the task?',
		type: 'CONFIRMATION'
	};

	const selectFinancialImportance = (value: number) => {
		if (value !== task.financial_importance) {
			task.financial_importance = value as TRelevance;
			changing = true;
		}
	};

	const selectSpiritualImportance = (value: number) => {
		if (value !== task.spiritual_importance) {
			task.spiritual_importance = value as TRelevance;
			changing = true;
		}
	};

	const selectSocialEmotionalImportance = (value: number) => {
		if (value !== task.social_emotional_importance) {
			task.social_emotional_importance = value as TRelevance;
			changing = true;
		}
	};

	const selectPhysicalImportance = (value: number) => {
		if (value !== task.physical_importance) {
			task.physical_importance = value as TRelevance;
			changing = true;
		}
	};

	const confirmDelete = () => {
		dialog.open = true;
		dialog.title = 'Confirm deletion';
		dialog.message = 'Do you wanna delete the task?';
		dialog.type = 'CONFIRMATION';
		dialog.onOkClick = () => {
			onDelete(task);
		};
	};

	const update = (task: ITask) => {
		if (!task.description) {
			error = 'Write the task description!';
			return;
		}

		console.log('SAVED TASK:', JSON.stringify(task, null, 2))
		onUpdate(task);
	};
</script>

<Dialog
	open={dialog.open}
	title={dialog.title}
	message={dialog.message}
	modalType={dialog.type}
	onOkClick={dialog.onOkClick}
/>

<button id={`task-${task.id}`} class={`task-container`}>
	<div class={`m-2 flex h-12 gap-4 p-1`}>
		<input
			id={uniqid()}
			type="text"
			class={`task-${task.id}-component`}
			bind:value={task.description}
			on:keydown={() => {
				if (task.description !== unchangedTask.description) changing = true;
			}}
		/>

		<UpdateButton {task} {update} active={changing} />

		<DeleteButton
			{task}
			{confirmDelete}
		/>
	</div>
	<div class="flex justify-end gap-4">
		<div class="section w-10 flex items-center justify-start pr-6">
			<p class="text-3xl text-left mt-2">{ordinal}</p>
		</div>
		<div class="section">
			<span class="text-center">Financial</span>
			<Relevance
				{task}
				size={3}
				value={task.financial_importance}
				onSelect={selectFinancialImportance}
			/>
		</div>
		<div class="section">
			<span class="text-center">Spiritual</span>
			<Relevance
				{task}
				size={3}
				value={task.spiritual_importance}
				onSelect={selectSpiritualImportance}
			/>
		</div>
		<div class="section">
			<span class="text-center">Social-emotional</span>
			<Relevance
				{task}
				size={3}
				value={task.social_emotional_importance}
				onSelect={selectSocialEmotionalImportance}
			/>
		</div>
		<div class="section">
			<span class="text-center">Physical</span>
			<Relevance
				{task}
				size={3}
				value={task.physical_importance}
				onSelect={selectPhysicalImportance}
			/>
		</div>
		<div class="section">
			<span class="text-center">Deadline</span>
			<Deadline selected={task.deadline} onSelect={(value) => {
				task.deadline = value
				changing = true
				console.log('SELECTED')
			}}/>
		</div>
	</div>
	{#if error}
		<strong class="ml-3 p-0 text-sm text-red-300">{error}</strong>
	{/if}
</button>

<!-- <input type="datetime-local" /> -->

<!-- <Datetime /> -->

<style lang="postcss">
	.task-container {
		@apply h-36 w-full p-4 text-sm;
	}

	.section {
		@apply flex flex-col items-center gap-2;
	}

	input {
		@apply w-full rounded border-none bg-transparent pl-0 text-white ring-0;
	}

	input:focus,
	input:active,
	input:hover {
		@apply border-none ring-0;
	}
</style>
