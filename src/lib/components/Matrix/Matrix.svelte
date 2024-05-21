<script lang="ts">
	import type { ITask } from '$lib/types';
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
	$: editMode = states.find((s) => s.changing || s.updating) !== undefined;

	const fillQuadrants = () => {
		q1 = tasks?.length ? tasks.filter((task) => task.important && task.urgent) : [];
		q2 = tasks?.length ? tasks?.filter((task) => task.important && !task.urgent) : [];
		q3 = tasks?.length ? tasks?.filter((task) => !task.important && task.urgent) : [];
		q4 = tasks?.length ? tasks?.filter((task) => !task.important && !task.urgent) : [];
	};

	const setupQuadrantStates = () => {
		states = tasks.map((task) => ({
			id: task.id,
			changing: false,
			updating: false,
			focus: false
		}));
	};

	const updateQuadrants = () => {
		console.log('UPDATE QUADRANTS');
		fillQuadrants();
		setupQuadrantStates();
	};

	const setState = (id: number, changing: boolean, updating: boolean, focus: boolean) => {
		for (let state of states) {
			if (state.id === id) {
				console.log('CHANGED');
				state.changing = changing;
				state.updating = updating;
				state.focus = focus;
			} else {
				// state.changing = false;
				// state.updating = false;
				state.focus = false;
			}
		}
		states = states;
	};
</script>

<div class="m-4">
	<div class="mb-4 flex">
		<CreateButton {onCreate} {editMode} />
	</div>
	<div class="grid grid-cols-2 gap-2 text-white">
		<Quadrant
			{states}
			color="important-urgent"
			htag="Do not delay!"
			tasks={q1}
			{onUpdate}
			{onDelete}
			{setState}
		/>
		<Quadrant
			{states}
			color="important-not-urgent"
			htag="No hurry"
			tasks={q2}
			{onUpdate}
			{onDelete}
			{setState}
		/>
		<Quadrant
			{states}
			color="not-important-urgent"
			htag="Opcional"
			tasks={q3}
			{onUpdate}
			{onDelete}
			{setState}
		/>
		<Quadrant
			{states}
			color="not-important-not-urgent"
			htag="Ignore it"
			tasks={q4}
			{onUpdate}
			{onDelete}
			{setState}
		/>
	</div>
</div>
