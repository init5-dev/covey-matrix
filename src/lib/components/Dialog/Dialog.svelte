<script lang="ts">
	import type { TModalType } from './types';
	import { CloseCircleOutline, QuestionCircleOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';

	export let open: boolean;
	export let title: string = '';
	export let message: string = '';
	export let modalType: TModalType = 'INFORMATION';
	export let okButtonMessage = 'OK';
	export let dismissButtonMessage = 'DISMISS';
	export let onOkClick: (() => void) | undefined = undefined;
	export let onDismissClick: (() => void) | undefined = undefined;

	const hide = () => {
		open = false;
	};
</script>

{#if open}
	<div
		class="background"
	>
		<div class="dialog">
			<div class="flex w-full justify-between">
				<h2 class="text-xl text-center">{title}</h2>
				<button on:click={hide}>
					<CloseCircleOutline />
				</button>
			</div>
			<div class="flex gap-3 items-start my-4">
				{#if modalType === 'CONFIRMATION'}
					<QuestionCircleOutline size='xl' />
				{/if}
				{#if modalType === 'INFORMATION'}
					<ExclamationCircleOutline size='xl' />
				{/if}
				<div class="w-full h-[2em] overflow-y-auto mt-1">
					<p>{message}</p>
				</div>
			</div>
			<div class="flex gap-4 items-center justify-center">
				{#if modalType === 'CONFIRMATION' || 'INFORMATION'}
				<button
					class="transparent-button w-16"
					on:click={() => {
						onOkClick && onOkClick();
						hide();
					}}
				>
					{okButtonMessage}
				</button>
			{/if}
			{#if modalType === 'CONFIRMATION'}
				<button class="transparent-button" on:click={() => {
					onDismissClick && onDismissClick()
					hide()
				}}>
					{dismissButtonMessage}
				</button>
			{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.background {
	  @apply fixed top-0 bottom-0 left-0 right-0 p-8;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.dialog {
		@apply fixed top-[35vh] md:ml-[35vw] md:w-[30vw] h-[30vh] rounded-lg border text-white p-4;
		background-color: rgba(0, 0, 0, 0.75);
	}
</style>