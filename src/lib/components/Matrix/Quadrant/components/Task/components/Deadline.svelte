<script lang="ts">
	import { type IDeadline, Deadlines } from '$lib/types';

	export let selected: number 
	export let onSelect: (value: number) => void

	let value: number = selected.value

	$:console.log(value)
</script>


<div class="flex gap-1">
	<select bind:value on:change={()=>{
		console.log('VALUE')
		onSelect(value)
	}}>
		{#each Deadlines as deadline, i}
			<option value={deadline.value} selected={value === selected.value}>{deadline.name}</option>
		{/each}
	</select>
</div>
