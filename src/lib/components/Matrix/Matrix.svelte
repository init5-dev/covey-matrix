<script lang="ts">
	import type { ITask } from '$lib/types';
	import { calculateImportance, calculateUrgency } from '$lib/utils/calculations';
	import type { IMatrixStates, IState } from '../Dialog/types';
	import Quadrant from './Quadrant/Quadrant.svelte';
	import CreateButton from './Quadrant/components/CreateButton.svelte';

	export let tasks: ITask[];
	export let onCreate: () => void;
	export let onUpdate: (task: ITask) => void;
	export let onDelete: (task: ITask) => void;

	let q1: ITask[] = [];
	let q2: ITask[] = [];
	let q3: ITask[] = [];
	let q4: ITask[] = [];

	let states: IState[] = [];

	$: tasks && updateQuadrants();


	const fillQuadrants = () => {
		let important
		let urgent;
		
		q1 = tasks?.length
			? tasks.filter((task) => {
					important = calculateImportance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return important && urgent
				})
			: [];
		q2 = tasks?.length
			? tasks.filter((task) => {
					important = calculateImportance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return important && !urgent
				})
			: [];
		q3 = tasks?.length
			? tasks.filter((task) => {
					important = calculateImportance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return !important && urgent
				})
			: [];
		q4 = tasks?.length
			? tasks.filter((task) => {
					important = calculateImportance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return !important && !urgent
				})
			: [];
	};

	const updateQuadrants = () => {
		fillQuadrants();
		// setupQuadrantStates();
	};
</script>

<div class="m-4">
	<div class="mb-4 flex">
		<CreateButton {onCreate} />
	</div>
	<div class="grid grid-cols-2 gap-2 text-white">
		<Quadrant color="important-urgent" htag="Do not delay!" tasks={q1} {onUpdate} {onDelete} />
		<Quadrant color="important-not-urgent" htag="No hurry" tasks={q2} {onUpdate} {onDelete} />
		<Quadrant color="not-important-urgent" htag="Opcional" tasks={q3} {onUpdate} {onDelete} />
		<Quadrant color="not-important-not-urgent" htag="Ignore it" tasks={q4} {onUpdate} {onDelete} />
	</div>
</div>
