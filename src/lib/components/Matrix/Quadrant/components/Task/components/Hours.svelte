<script lang="ts">
	export let hours: string = '0';
	export let max: number = 2920;
  export let onChange: (value: number) => void

	const startingZeros = () => {
		let c = 0;

		for (let digit of hours) {
			if (digit !== '0') break;
			c++;
		}

		return c;
	};

	$: value = Number(hours);
	$: hours = Number(hours) > max ? String(max) : hours;
	$: hours =
		(hours.length > 1 && hours.at(0) === '0' && Number(hours.at(1)) > 1) ||
		(Number(hours) === 0 && startingZeros() > 1)
			? hours.slice(1)
			: hours;
  $: onChange(Number(hours))

	const increment = () => {
		if (value < max) hours = String(value + 1);
	};

	const decrement = () => {
		if (value > 0) hours = String(value - 1);
	};

	const validateKey = (e: KeyboardEvent) => {
		if (isNaN(Number(e.key))) {
			e.preventDefault();
		}
	};
</script>

<div class="hours-container">
	<input type="text" bind:value={hours} on:keypress={validateKey} />
	<div class="flex gap-1">
		<button on:click={increment} disabled={value === max}>+</button>
		<button on:click={decrement} disabled={value === 0}>-</button>
	</div>
</div>

<style lang="postcss">
	div.hours-container {
		@apply flex h-4 items-center;
	}

	input {
		@apply m-0 h-full w-8 border-none bg-transparent p-0 text-center text-sm;
	}

	input:hover,
	input:focus,
	input:active {
		@apply ring-0;
	}

	button {
		@apply w-2 p-1;
	}
</style>
