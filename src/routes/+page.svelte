<script lang="ts">
	import Matrix from '$lib/components/Matrix/Matrix.svelte';
	import type { ITask } from '$lib/types';
	import type { PageData } from './$types';

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

	export let data: PageData;

	let tasks = data.tasks;
	let error = '';
  let message = ''
	let allowCreate = true;

	const onCreate = async () => {
		if (!allowCreate) return;

    message = ''

		try {
			let response = await fetch('/api/v1/create');

			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					message = 'Empty task created'

          try {
            response = await fetch('/api/v1/load');

            if (response.ok) {
              const data = await response.json()
              
              if (data.success) {
                tasks = data.tasks
              } else {
                error = data.error
              }
            }
          } catch (error) {
            error = response.statusText;
          }
				} else {
					allowCreate = false;
				}
			} else {
				error = response.statusText;
			}
		} catch (err) {
      error = (err as Error).message
    }

		// response = await fetch('/api/v1/load')

		// if (response.ok) {
		//   tasks = await response.json()
		// }
	};

	const onUpdate = (task: ITask) => {};

	const onDelete = (task: ITask) => {};
</script>

<div class="h-4">
  {#if error}
	<strong class="text-red-300 text-center w-full m-4">{error}</strong>
{/if}

{#if message}
	<strong class="text-lime-300 text-center w-full m-4">{message}</strong>
{/if}
</div>

<Matrix {tasks} {onCreate} {onUpdate} {onDelete} />
