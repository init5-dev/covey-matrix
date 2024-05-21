<script lang="ts">
	import type { ITask, TColor } from '$lib/types';
	import Task from './components/Task/Task.svelte';
	import CreateButton from './components/CreateButton.svelte';
	import quadrantColor from '../colors';
	import type { IState } from "$lib/components/Dialog/types";

	export let states: IState[]
	export let htag: string = '';
	export let vtag: string = '';
	export let tasks: ITask[];
	export let color: TColor = 'none';
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;
	export let setState: (id: number, changing: boolean, updating: boolean, focus: boolean) => void

	const calcPriority = (task: ITask) => {
		const {important, urgent, hours} = task

		return (important * urgent)
	}
	tasks?.sort((a: ITask, b: ITask) => calcPriority(b) - calcPriority(a));
</script>

<div class={`flex w-full gap-4 border border-gray-200 p-4 ${color && quadrantColor(color)}`}>
	{#if vtag}
		<strong class="vtext text-center">{vtag}</strong>
	{/if}
	<div class="flex w-full flex-col gap-2">
		{#if htag}
			<strong class="w-full text-center">{htag}</strong>
		{/if}
		<div
			class={`flex min-h-96 w-full flex-col gap-2 ${!tasks.length && 'items-center justify-center'}`}
		>
			{#key tasks}
				{#if tasks.length}
					{#each tasks as task}
						<Task {task} {states} {onUpdate} {onDelete} {setState} />
					{/each}
				{:else}
					<div>
						<strong class="text-center text-red-500">No tasks</strong>
					</div>
				{/if}
			{/key}
		</div>
	</div>
</div>

<style>
	.vtext {
		writing-mode: sideways-lr;
		-ms-writing-mode: sideways-lr;
		text-orientation: mixed;
	}
</style>
