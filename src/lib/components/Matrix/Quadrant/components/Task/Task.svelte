<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask, TRelevance } from '$lib/types';
	import Relevance from './components/Relevance.svelte';
	import UpdateButton from './components/UpdateButton.svelte';
	import { onMount } from 'svelte';
	import Hours from './components/Hours.svelte';
	import Dialog from '$lib/components/Dialog/Dialog.svelte';
	import type { IDialog, IState } from '$lib/components/Dialog/types';
	import { uniqid } from '$lib/utils/uniqid';

	export let task: ITask;
	export let states: IState[];
	export let onChange: (id: number | null) => void;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	let updating = false;
	let taskEl: HTMLElement | null | undefined

	$: changing = states.find((state) => state.id === task.id)?.updating || false;
	$: if (changing && !focus && !updating) {
		dialog.open = true;
		dialog.title = 'Save changes';
		dialog.message = 'Do you want to save the changes?';
		dialog.type = 'CONFIRMATION';
		dialog.onOkClick = () => {
			update();
		};

		dialog.onDismissClick = () => {
			id = task.id;
			description = task.description;
			important = task.important;
			urgent = task.urgent;
			hours = task.hours;

			onChange(null);
		};
	}

	let focus = false;
	let error = '';
	let dialog: IDialog = {
		open: false,
		trigger: null,
		title: '',
		message: '',
		type: 'INFORMATION',
		onOkClick: undefined
	};

	let { id, description, important, urgent, hours } = task;

	onMount(() => {
		taskEl = document.getElementById(`task-${id}`);
		dialog.trigger = taskEl;
	});

	const setFocus = () => {
		const isAnotherUpdating = states.find((state) => state.updating && state.id !== task.id)
			? true
			: false;

		const taskComponents = document.getElementsByClassName(`task-${task.id}-component`);

		let taskElFocused = false;

		for (let taskComponent of taskComponents) {
			if (document.activeElement?.id === taskComponent.id) {
				taskElFocused = true;
			}
		}

		focus = taskElFocused;
	};

	const unsetFocus = () => {
		focus = false;
	};

	const selectImportance = (value: number) => {
		if (value !== important) onChange(task.id);
		important = value as TRelevance;
	};

	const selectUrgency = (value: number) => {
		if (value !== urgent) onChange(task.id);
		urgent = value as TRelevance;
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

	const update = () => {
		updating = true;

		if (!description) {
			error = 'Write the task description!';
			setFocus();
			return;
		}

		onUpdate({
			id,
			description,
			important,
			urgent,
			hours
		});

		unsetFocus();
		onChange(null);

		updating = false;
	};
</script>

<Dialog
	open={dialog.open}
	trigger={dialog.trigger}
	modalType={dialog.type}
	title={dialog.title}
	message={dialog.message}
	onOkClick={dialog.onOkClick}
	onDismissClick={dialog.onDismissClick}
/>
<form
	id={`task-${id}`}
	on:focusin={() => {
		setFocus();
	}}
	on:focusout={() => {
		unsetFocus();
	}}
	class={`task-container ${changing && !focus && `border border-dashed border-gray-200`} ${focus && 'border border-solid border-gray-200 focused-component'}`}
>
	<div class="flex gap-4">
		<input
			id={uniqid()}
			type="text"
			class={`task-${task.id}-component`}
			bind:value={description}
			on:keyup={() => {
				if (task.description.trim() !== description.trim()) onChange(task.id);
				error = '';
			}}
			on:focusin={() => {
				setFocus();
			}}
		/>
		<div class="section">
			<span class="text-center">Important</span>
			<Relevance
				{task}
				size={3}
				value={important}
				onSelect={selectImportance}
				setFocus={() => {
					if (changing) {
						focus = false;
						return;
					}
					focus = true;
				}}
			/>
		</div>
		<div class="section">
			<span class="text-center">Urgent</span>
			<Relevance
				{task}
				size={3}
				value={urgent}
				onSelect={selectUrgency}
				setFocus={() => {
					if (changing) {
						focus = false;
						return;
					}
					focus = true;
				}}
			/>
		</div>
		<div class="section">
			<span class="text-center">Hours</span>
			<Hours
				{task}
				hours={String(hours)}
				onChange={(value) => {
					if (hours !== value) {
						onChange(task.id);
						focus = true;
					}

					hours = value;
				}}
			/>
		</div>
		<UpdateButton {task} onUpdate={update} />
		<DeleteButton {task} {confirmDelete} />
	</div>
	{#if error}
		<strong class="ml-3 p-0 text-sm text-red-300">{error}</strong>
	{/if}
</form>

<style lang="postcss">
	.task-container {
		@apply w-full p-4 text-sm;
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
