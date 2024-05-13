<script lang="ts">
	import Matrix from "$lib/components/Matrix/Matrix.svelte";
	import type { ITask } from "$lib/components/Matrix/types";

  const tasks: ITask[] = [
    {
      id: '1',
      description: 'Sacar la basura',
      urgent: false,
      important: true,
      hours: 0
    },
    {
      id: '2',
      description: 'Terminar el encargo',
      urgent: true,
      important: true,
      hours: 5
    },
    {
      id: '3',
      description: 'Responder los emails',
      urgent: true,
      important: true,
      hours: 1
    },
    {
      id: '4',
      description: 'Escribir próximo capítulo de mi novela',
      urgent: false,
      important: true,
      hours: 0
    },
  ]

</script>
<Matrix {tasks} />
