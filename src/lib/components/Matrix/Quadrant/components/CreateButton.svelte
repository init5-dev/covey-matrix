<script lang="ts">
  import {PlusOutline} from 'flowbite-svelte-icons'
	import type { ITask } from "../../types";

	export let onCreate: (task: ITask) => void
</script>

<button
	on:click={() => {
		 onCreate(task);
	}}
	class='transparent-button'
>
	<PlusOutline />
</button>