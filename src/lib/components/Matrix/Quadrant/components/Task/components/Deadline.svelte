<script lang="ts">
	import { Deadlines as deadlines } from '$lib/types';
	import { AngleLeftOutline, AngleRightOutline } from 'flowbite-svelte-icons'

	export let selected: number;
	export let onSelect: (value: number) => void;

	let open = false

	$: selectedName = deadlines.find(d => d.value === selected)?.name

	const next = () => {
		let i = deadlines.indexOf(deadlines.find(d => d.value === selected) || deadlines[0])

		if (i <= deadlines.length - 2) {
			selected = deadlines[i + 1].value
		} else {
			selected = deadlines[0].value
		}

		onSelect(selected)
	}

	const prev = () => {
		let i = deadlines.indexOf(deadlines.find(d => d.value === selected) || deadlines[0])

		if (i >= 1) {
			selected = deadlines[i - 1].value
		} else {
			selected = deadlines[deadlines.length-1].value
		}

		onSelect(selected)
	}
</script>

<div class="flex gap-1">
	<button on:click={prev}>
		<AngleLeftOutline />
	</button>
	<p class="w-24">{selectedName}</p>
	<button on:click={next}>
		<AngleRightOutline />
	</button>
</div>
