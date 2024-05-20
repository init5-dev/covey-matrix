<script lang="ts">
	import type { ITask } from '$lib/types';
	import type { IMatrixStates, IState } from '../Dialog/types';
	import Quadrant from './Quadrant/Quadrant.svelte';
	import CreateButton from './Quadrant/components/CreateButton.svelte';
	import Task from './Quadrant/components/Task/Task.svelte';

	export let q1: ITask[];
	export let q2: ITask[];
	export let q3: ITask[];
	export let q4: ITask[];
	export let onCreate: () => void;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	const getQuadrantStates = (q: ITask[]): IState[] => {
		return q.map((task) => ({
			id: task.id,
			updating: task.id === updatingTaskId
		}));
	};

	let updatingTaskId: number | null = null;

	let states: IMatrixStates = {
		q1: getQuadrantStates(q1),
		q2: getQuadrantStates(q2),
		q3: getQuadrantStates(q3),
		q4: getQuadrantStates(q4)
	};
</script>

<div class="m-4">
	<div class="mb-4 flex">
		<CreateButton {onCreate} />
	</div>
	<div class="grid grid-cols-2 gap-2 text-white">
		<Quadrant
			states={states.q1}
			color="important-urgent"
			vtag="Important"
			htag="Urgent"
			tasks={q1}
			{onUpdate}
			{onDelete}
		/>
		<Quadrant
			states={states.q2}
			color="important-not-urgent"
			htag="Not urgent"
			tasks={q2}
			{onUpdate}
			{onDelete}
		/>
		<Quadrant
			states={states.q3}
			color="not-important-urgent"
			vtag="Not important"
			tasks={q3}
			{onUpdate}
			{onDelete}
		/>
		<Quadrant
			states={states.q4}
			color="not-important-not-urgent"
			tasks={q4}
			{onUpdate}
			{onDelete}
		/>
	</div>
</div>
