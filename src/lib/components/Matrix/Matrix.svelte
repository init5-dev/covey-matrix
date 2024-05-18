<script lang="ts">
	import type { ITask } from "$lib/types";
	import Quadrant from './Quadrant/Quadrant.svelte';
	import CreateButton from "./Quadrant/components/CreateButton.svelte";

	export let q1: ITask[];
	export let q2: ITask[];
	export let q3: ITask[];
	export let q4: ITask[];
	export let updatedTaskId: string | null = null
	export let onCreate: () => void;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

</script>

<div class="m-4">
	<div class="mb-4 flex">
		<CreateButton {onCreate} />
	</div>
	<div class="grid grid-cols-2 gap-2 text-white">
		<Quadrant {updatedTaskId} color='important-urgent' vtag="Important" htag="Urgent" tasks={q1} {onUpdate} {onDelete} />
		<Quadrant {updatedTaskId} color='important-not-urgent' htag="Not urgent"  tasks={q2} {onUpdate} {onDelete} />
		<Quadrant {updatedTaskId} color='not-important-urgent' vtag="Not important" tasks={q3} {onUpdate} {onDelete} />
		<Quadrant {updatedTaskId} color='not-important-not-urgent' tasks={q4} {onUpdate} {onDelete} />
	</div>
</div>