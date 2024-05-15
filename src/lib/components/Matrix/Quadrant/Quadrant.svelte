<script lang="ts">
	import type { ITask, TColor } from "$lib/types";
	import Task from './components/Task/Task.svelte';
	import CreateButton from './components/CreateButton.svelte';
	import quadrantColor from "../colors";

	export let updatedTaskId: string | null = null
	export let htag: string = '';
	export let vtag: string = '';
	export let tasks: ITask[];
  export let color: TColor = 'none'
	export let onCreate: () => void;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	console.log('QUADRANT UPDATED TASK ID:', updatedTaskId)
</script>

<div class={`flex gap-4 w-full border border-gray-200 p-4 ${color && quadrantColor(color)}`}>
	{#if vtag}
		<strong class="vtext text-center">{vtag}</strong>
	{/if}
	<div class="flex w-full flex-col gap-2">
		{#if htag}
			<strong class="w-full text-center">{htag}</strong>
		{/if}
		<div class="mb-4 flex justify-end">
			<CreateButton {onCreate} />
		</div>
		<div
			class={`flex min-h-96 w-full flex-col gap-2 ${!tasks.length && 'items-center justify-center'}`}
		>
			{#if tasks.length}
				{#each tasks as task}
					<Task {task} {onUpdate} {onDelete} focus={String(task.id) === updatedTaskId}/>
				{/each}
			{:else}
				<div>
					<strong class="text-center text-red-500">No tasks</strong>
				</div>
			{/if}
		</div>
	</div>
</div>


<style>
  .vtext {
    writing-mode: sideways-lr;
    text-orientation: mixed;
  }
</style>