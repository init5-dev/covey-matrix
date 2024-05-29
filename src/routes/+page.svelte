<script lang="ts">
	import Matrix from '$lib/components/Matrix/Matrix.svelte';
	import type { ITask } from '$lib/types';
	import { onMount } from 'svelte';

	let tasks: ITask[] | undefined;
	let updated: boolean;
	let deleted: boolean;
	let error: string;
	let message: string;

	let newTaskId = -1

	onMount(async () => {
		updated = false;
		deleted = false;
		error = '';
		message = '';

		await load();
	});

	$: updated &&
		(async () => {
			if (updated) {
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
					tasks?.push(data.task);
					console.log(
						JSON.stringify(
							tasks?.map((t) => t.description),
							null,
							2
						)
					);
					tasks = tasks;
					updated = true;
					newTaskId = data.task.id
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
					const taskDeleted = tasks?.find((t) => t.id === task.id);
					if (taskDeleted) {
						tasks?.splice(tasks.indexOf(taskDeleted), 1);
					}
					tasks?.push(data.task);
					tasks = tasks;
					updated = true;
					newTaskId = -1
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
		const tasksSave = JSON.parse(JSON.stringify(tasks));
		tasks = tasks?.filter((t) => t.id !== task.id);

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
					newTaskId = -1
					const taskDeleted = tasks?.find((t) => t.id === task.id);
					if (taskDeleted) {
						tasks?.splice(tasks.indexOf(taskDeleted), 1);
					}
					updated = true;
					deleted = true;
				} else {
					error = data.error;
					tasks = tasksSave;
				}
			} else {
				error = response.statusText;
				tasks = tasksSave;
			}
		} catch (err) {
			error = (err as Error).message;
			tasks = tasksSave;
		}
	};
</script>

{#if error}
	<div class="h-4">
		<strong class="message-tag m-4 w-full text-center text-red-300">{error}</strong>
	</div>
{/if}

{#if message}
	<div class="h-4">
		<strong class="message-tag m-4 w-full text-center text-lime-300">{message}</strong>
	</div>
{/if}

{#key tasks}
	{#if tasks}
		<Matrix {tasks} {newTaskId} {onCreate} {onUpdate} {onDelete} />
	{/if}
{/key}
