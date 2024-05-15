<script lang="ts">
	import type { ITask } from "$lib/types";
	import Quadrant from './Quadrant/Quadrant.svelte';

	export let tasks: ITask[];
	export let updatedTaskId: string | null = null
	export let onCreate: () => void;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	// $: tasks = tasks.sort((a, b) => (a.important * a.urgent) - (b.important * b.urgent))
	$: q1 = tasks.filter((task) => task.important && task.urgent);
	$: q2 = tasks.filter((task) => task.important && !task.urgent);
	$: q3 = tasks.filter((task) => !task.important && task.urgent);
	$: q4 = tasks.filter((task) => !task.important && !task.urgent);

</script>

<div class="m-4 grid grid-cols-2 gap-2 text-white">
	<Quadrant {updatedTaskId} color='important-urgent' vtag="Important" htag="Urgent" tasks={q2} {onCreate} {onUpdate} {onDelete} />
	<Quadrant {updatedTaskId} color='important-not-urgent' htag="Not urgent"  tasks={q1} {onCreate} {onUpdate} {onDelete} />
	<Quadrant {updatedTaskId} color='not-important-urgent' vtag="Not important" tasks={q3} {onCreate} {onUpdate} {onDelete} />
	<Quadrant {updatedTaskId} color='not-important-not-urgent' tasks={q4} {onCreate} {onUpdate} {onDelete} />
</div>