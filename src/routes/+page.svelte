<script lang="ts">
	import Matrix from '$lib/components/Matrix/Matrix.svelte';
	import type { ITask } from '$lib/types';
	import type { PageData } from './$types';
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
	let error: string;
	let message: string;
	let allowCreate: boolean;
	let updatedTaskId: string | null;

	onMount(async () => {
		updated = false;
		error = '';
		message = '';
		allowCreate = true;
		updatedTaskId = null;

		await load()
	});

	$: (async () => {
		if (updated) {
			console.log('RELOADING...')
			await load();
			updated = false;

			if (updatedTaskId) {
				const updatedTaskEl = document.getElementById(updatedTaskId);

				if (updatedTaskEl) {
					updatedTaskEl.scrollIntoView({
						behavior: 'smooth'
					});
				}
			}
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
		if (!allowCreate) return;

		message = '';

		try {
			let response = await fetch('/api/v1/create');

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					message = 'Empty task created';
					updatedTaskId = String(data.task.id);
					updated = true
				} else {
					allowCreate = false;
				}
			} else {
				error = response.statusText;
			}
		} catch (err) {
			error = (err as Error).message;
		}
	};

	const onUpdate = async (task: ITask) => {
		try {
			console.log('UPDATE')
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
</script>

<div class="h-4">
	{#if error}
		<strong class="m-4 w-full text-center text-red-300">{error}</strong>
	{/if}

	{#if message}
		<strong class="m-4 w-full text-center text-lime-300">{message}</strong>
	{/if}
</div>

{#if tasks}
	<Matrix {tasks} {onCreate} {onUpdate} {onDelete} {updatedTaskId}/>
{/if}
