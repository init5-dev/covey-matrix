<script lang="ts">
	import type { ITask } from "$lib/types";
	import { uniqid } from "$lib/utils/uniqid";

	export let task: ITask
	export let size: number;
	export let value: number;
	export let onSelect: (value: number) => void;
	export let setFocus: () => void;

	interface IStar {
		active: boolean;
	}

	const stars: IStar[] = [];

	for (let i = 0; i < size; i++) {
		stars.push({
			active: i < value
		});
	}
</script>

<div on:focusin={setFocus} id={`relevance-${uniqid()}`} class={`flex items-center justify-center task-${task.id}-component`}>
	{#each stars as star, index}
		<button
			on:mousedown={(e) => {
				e.preventDefault()
				stars.forEach(star => star.active = false)

				for(let i=0; i<=index; i++) stars[i].active = true
				
				if (index + 1 === value && star.active) {
					star.active = false
				}

				value = stars.filter((star) => star.active).length;

				setFocus()
				onSelect(value);
			}}
		>
			{#if star.active}
				<svg
					class="me-1 h-4 w-4 text-yellow-300"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
				>
					<path
						d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
					/>
				</svg>
			{:else}
				<svg
					class="me-1 h-4 w-4 text-gray-300 dark:text-gray-500"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 22 20"
				>
					<path
						d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
					/>
				</svg>
			{/if}
		</button>
	{/each}
</div>
