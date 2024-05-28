<script lang="ts">
	import type { ITask, TColor } from '$lib/types';
	import Task from './components/Task/Task.svelte';
	import CreateButton from './components/CreateButton.svelte';
	import quadrantColor from '../colors';
	import type { IState } from "$lib/components/Dialog/types";
	import { calculateRelevance, calculateUrgency } from "$lib/utils/calculations";

	export let htag: string = '';
	export let vtag: string = '';
	export let tasks: ITask[];
	export let color: TColor = 'none';
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	const calcPriority = (task: ITask) => {
		const importance = calculateRelevance(task)
		const urgency = calculateUrgency(task)

		return importance * (1 + urgency)
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
					{#each tasks as task, i}
						<Task ordinal={i+1} {task} {onUpdate} {onDelete} />
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
