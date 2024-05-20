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

	const onChange = (id: number | null) => {
		if (id) {
			states = states.map(state => state.id === id ? {...state, updating: true}: {...state})
		} else {
			states = states.map(state => ({...state, updating: false}))
		}
	};

	tasks?.sort((a: ITask, b: ITask) => a.important * a.urgent - b.important * b.urgent);
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
						<Task {task} {onChange} {onUpdate} {onDelete} {states} />
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
		text-orientation: mixed;
	}
</style>
