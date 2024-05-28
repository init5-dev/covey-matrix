<script lang="ts">
	import type { ITask } from '$lib/types';
	import { calculateRelevance, calculateUrgency } from '$lib/utils/calculations';
	import { Heading } from 'flowbite-svelte';
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
		let important;
		let urgent;

		q1 = tasks?.length
			? tasks.filter((task) => {
					important = calculateRelevance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return important && urgent;
				})
			: [];
		q2 = tasks?.length
			? tasks.filter((task) => {
					important = calculateRelevance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return important && !urgent;
				})
			: [];
		q3 = tasks?.length
			? tasks.filter((task) => {
					important = calculateRelevance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return !important && urgent;
				})
			: [];
		q4 = tasks?.length
			? tasks.filter((task) => {
					important = calculateRelevance(task);
					urgent = calculateUrgency(task);

					console.log(`Task #${task.id}: I:${important}, U:${urgent} `);

					return !important && !urgent;
				})
			: [];
	};

	const updateQuadrants = () => {
		fillQuadrants();
		// setupQuadrantStates();
	};
</script>

<div class="mx-2 my-0">
	<div class="mb-4 flex justify-between items-end">
		<div>
			<Heading tag="h1"><span class="text-white text-xl">Multidimensional Covey's Matrix</span></Heading>
			<p class="text-white">Init5dev 🄯 2024</p>
		</div>
		<div class="mb-2">
			<CreateButton {onCreate} />
		</div>
	</div>
	<div class="grid grid-cols-2 gap-2 text-white">
		<Quadrant color="important-urgent" htag="Do not delay!" tasks={q1} {onUpdate} {onDelete} />
		<Quadrant color="important-not-urgent" htag="No hurry" tasks={q2} {onUpdate} {onDelete} />
		<Quadrant color="not-important-urgent" htag="Opcional" tasks={q3} {onUpdate} {onDelete} />
		<Quadrant color="not-important-not-urgent" htag="Ignore it" tasks={q4} {onUpdate} {onDelete} />
	</div>
</div>
