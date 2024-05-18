<script lang="ts">
	import Matrix from '$lib/components/Matrix/Matrix.svelte';
	import type { ITask } from '$lib/types';
	import { onMount } from 'svelte';

	// const tasks: ITask[] = [
	//   {
	//     id: '1',
	//     description: 'Sacar la basura',
	//     urgent: false,
	//     important: true,
	//     hours: 0
	//   },
	//   {
	//     id: '2',
	//     description: 'Terminar el encargo',
	//     urgent: true,
	//     important: true,
	//     hours: 5
	//   },
	//   {
	//     id: '3',
	//     description: 'Responder los emails',
	//     urgent: true,
	//     important: true,
	//     hours: 1
	//   },
	//   {
	//     id: '4',
	//     description: 'Escribir próximo capítulo de mi novela',
	//     urgent: false,
	//     important: true,
	//     hours: 0
	//   },
	// ]

	let tasks: ITask[] | undefined;
	let updated: boolean;
	let deleted: boolean;
	let error: string;
	let message: string;
	let updatedTaskId: string | null;
	let q1: ITask[] = [];
	let q2: ITask[] = [];
	let q3: ITask[] = [];
	let q4: ITask[] = [];

	$: tasks?.length ? fillQuadrants() : null;

	const fillQuadrants = () => {
		q1 = tasks?.length ? tasks.filter((task) => task.important && task.urgent) : [];
		q2 = tasks?.length ? tasks?.filter((task) => task.important && !task.urgent) : [];
		q3 = tasks?.length ? tasks?.filter((task) => !task.important && task.urgent) : [];
		q4 = tasks?.length ? tasks?.filter((task) => !task.important && !task.urgent) : [];
	};

	onMount(async () => {
		updated = false;
		deleted = false;
		error = '';
		message = '';
		updatedTaskId = null;

		await load();
	});

	$: updated &&
		(async () => {
			if (updated) {
				console.log('RELOADING...');
				await load();

				// if (updatedTaskId) {
				// 	const updatedTaskEl = document.getElementById(updatedTaskId);

				// 	if (updatedTaskEl) {
				// 		updatedTaskEl.scrollIntoView({
				// 			behavior: 'smooth'
				// 		});
				// 	}
				// }

				error = '';
				message = '';
				updated = false;
				deleted = false;
			}
		})();

	$: (error || message) &&
		(() => {
			const messageTags = document.getElementsByClassName('message-tag ');

			for (let tag of messageTags) {
				tag.scrollIntoView({
					behavior: 'smooth'
				});
			}
		})();

	const load = async () => {
		let response;
		try {
			response = await fetch('/api/v1/load');

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					tasks = data.tasks;
				} else {
					error = data.error;
				}
			} else {
				error = response.statusText;
			}
		} catch (e) {
			error = (e as Error).message;
		}
	};

	const onCreate = async () => {
		message = '';

		try {
			let response = await fetch('/api/v1/create');

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					updatedTaskId = String(data.task.id);
					updated = true;
				} else {
					error = data.error;
				}
			} else {
				error = response.statusText;
			}
		} catch (err) {
			error = (err as Error).message;
		}
	};

	const handleUpdating = (task: ITask) => {};

	const onUpdate = async (task: ITask) => {
		try {
			const response = await fetch('/api/v1/update', {
				method: 'PUT',
				body: JSON.stringify(task),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					updatedTaskId = String(data.task.id);
					updated = true;
				} else {
					error = data.error;
				}
			} else {
				error = response.statusText;
			}
		} catch (err) {
			error = (err as Error).message;
		}
	};

	const onDelete = async (task: ITask) => {
		try {
			const response = await fetch('/api/v1/delete', {
				method: 'DELETE',
				body: JSON.stringify({
					id: task.id
				}),
				headers: {
					'content-type': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					// tasks = tasks?.filter(task => task.id !== data.task.id)
					console.log('SUCCESS ON DELETING:', JSON.stringify(data.task));
					updated = true;
					deleted = true;
				} else {
					error = data.error;
				}
			} else {
				error = response.statusText;
			}
		} catch (err) {
			error = (err as Error).message;
		}
	};
</script>

<div class="h-4">
	{#if error}
		<strong class="message-tag m-4 w-full text-center text-red-300">{error}</strong>
	{/if}

	{#if message}
		<strong class="message-tag m-4 w-full text-center text-lime-300">{message}</strong>
	{/if}
</div>

{#key tasks}
	{#if tasks}
		<Matrix {q1} {q2} {q3} {q4} {onCreate} {onUpdate} {onDelete} {updatedTaskId} />
	{/if}
{/key}
