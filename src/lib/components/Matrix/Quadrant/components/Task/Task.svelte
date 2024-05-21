<script lang="ts">
	import DeleteButton from './components/DeleteButton.svelte';
	import type { ITask, TRelevance } from '$lib/types';
	import Relevance from './components/Relevance.svelte';
	import UpdateButton from './components/UpdateButton.svelte';
	import Hours from './components/Hours.svelte';
	import Dialog from '$lib/components/Dialog/Dialog.svelte';
	import type { IDialog, IState } from '$lib/components/Dialog/types';
	import { uniqid } from '$lib/utils/uniqid';
	import { onMount } from "svelte";

	export let task: ITask;
	export let states: IState[];
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;
	export let setState: (id: number, changing: boolean, updating: boolean, focus: boolean) => void;

	let { id, description, important, urgent, hours } = task;

	let changing = false;
	let updating = false;
	let focus = false;

	let isMouseInside = false;
	let inputFocused = false

	$: console.log('STATE CHANGE');

	let error = '';
	let dialog: IDialog = {
		open: false,
		trigger: null,
		title: '',
		message: '',
		type: 'INFORMATION',
		onOkClick: undefined
	};

	const isAnotherTaskFocused = () => {
		const result = states.find((t) => t.focus && t.id !== task.id) !== undefined;
		console.log(
			'IS ANOTHER TASK FOCUSED:',
			states.find((t) => t.focus && t.id !== task.id)
		);
	};

	const updateDialog = () => {
		console.log('CHANGING ON UPDATE DIALOG:', changing);
		console.log('FOCUS ON UPDATE DIALOG:', focus);
		if (changing && !focus && !updating) {
			dialog.open = true;
			dialog.title = 'Save changes';
			dialog.message = 'Do you want to save the changes?';
			dialog.type = 'CONFIRMATION';
			dialog.onOkClick = () => {
				setFocus(false);
				update();
			};

			dialog.onDismissClick = () => {
				id = task.id;
				description = task.description;
				important = task.important;
				urgent = task.urgent;
				hours = task.hours;

				// onChange(null);
				setChanging(false);
				setFocus(false);
			};
		}
	};

	const updateInternalState = () => {
		const thisState = states.find((t) => t.id === task.id);

		if (thisState) {
			changing = thisState.changing;
			updating = thisState.updating;
			focus = thisState.focus;

			console.log('FOCUS:', JSON.stringify(states, null, 2));
		}
	};

	const setChanging = (value: boolean) => {
		if (changing !== value) {
			setState(task.id, value, updating, focus);
			updateInternalState();
		}
	};

	const setUpdating = (value: boolean) => {
		if (updating !== value) {
			setState(task.id, changing, value, focus);
			updateInternalState();
		}
	};

	const setFocus = (value: boolean) => {
		if (!focus && value) {
			console.log('MI:', isMouseInside)
			setState(task.id, changing, updating, value);
			updateInternalState();
			return;
		}

		if (focus && !value && !isMouseInside) {
			setState(task.id, changing, updating, value);
			updateInternalState();
			return;
		}
	};

	const selectImportance = (value: number) => {
		if (value !== important) {
			setChanging(true);
		}
		important = value as TRelevance;
	};

	const selectUrgency = (value: number) => {
		if (value !== urgent) {
			setChanging(true);
		}
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
		setUpdating(true);
		setFocus(true)

		if (!description) {
			error = 'Write the task description!';
			// setFocus(true);
			return;
		}

		onUpdate({
			id,
			description,
			important,
			urgent,
			hours
		});

		setUpdating(false);
		setFocus(false);
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

{#key changing || updating || focus}
	<button
		id={`task-${id}`}
		on:focusin={() => {
			setFocus(true);
		}}
		on:focusout={() => {
			setFocus(false);
			console.log('FOCUS:', focus);
			updateDialog();
		}}
		on:mouseenter={() => {
			isMouseInside = true;
		}}
		on:mouseleave={() => {
			isMouseInside = false;
			setFocus(false)
			inputFocused = false
		}}
		class={`task-container ${changing && !focus && `border border-dashed border-gray-200`} ${focus && 'ring-1 ring-gray-200'}`}
	>
		<div class={`p-1 m-2 h-12 ${inputFocused || changing ? 'ring-1 ring-gray-200 ring-opacity-25': ''} t`}>
			<input
			id={uniqid()}
			type="text"
			class={`task-${task.id}-component`}
			bind:value={description}
			on:mouseenter={(e)=>{
				setFocus(true)
				inputFocused = true
			}}
			on:keyup={() => {
				if (task.description.trim() !== description.trim()) setChanging(true);
				error = '';
			}}
			on:focusin={() => {
				setFocus(true);
			}}
		/>
		</div>
		<div
			class="flex gap-4 justify-end"
			on:focusin={() => {
				setFocus(true);
			}}
		>
			<div class="section">
				<span class="text-center">Important</span>
				<Relevance
					{task}
					size={3}
					value={important}
					onSelect={selectImportance}
					setFocus={() => {
						setFocus(true);
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
						setFocus(true);
					}}
				/>
			</div>
			<!-- <div class="section">
				<span class="text-center">Hours</span>
				<Hours
					{task}
					hours={String(hours)}
					onChange={(value) => {
						setFocus(true);
						hours = value;
					}}
					setFocus={() => {
						setFocus(true);
					}}
				/>
			</div> -->
			<UpdateButton
				{task}
				onUpdate={() => {
					
					update();
				}}
			/>
			<DeleteButton
				{task}
				confirmDelete={() => {
					confirmDelete();
				}}
			/>
		</div>
		{#if error}
			<strong class="ml-3 p-0 text-sm text-red-300">{error}</strong>
		{/if}
	</button>
{/key}

<style lang="postcss">
	.task-container {
		@apply w-full h-36 p-4 text-sm;
	}

	.section {
		@apply flex flex-col items-center gap-2;
	}

	input {
		@apply w-full rounded border-none bg-transparent text-white ring-0 pl-0;
	}

	input:focus,
	input:active,
	input:hover {
		@apply border-none ring-0;
	}
</style>
