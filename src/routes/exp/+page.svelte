<script>
	let focus = false;
	const setFocus = (value) => {
		focus = value;
	};
</script>

<div class="bg-white p-4">
	<button
		class="m-8 w-96 bg-red-400 p-8"
		on:focusin={() => {
			setFocus(true);
		}}
		on:focusout={() => {
			setFocus(false);
		}}
	>
		<span>Label</span>
		<button on:click={()=>{alert('Clicked!')}}>Button</button>
	</button>

	<p>FOCUS: {focus}</p>
</div>
