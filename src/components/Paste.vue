<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const { copy } = useClipboard();

defineProps<{
	title: string;
	content?: string;
	date?: string;
	chars?: number;
	size?: number;
	deadTitle?: boolean;
}>();

async function share() {
	copy(window.location.href);
	alert("Copied to clipboard.");
}
</script>

<template>
	<div class="mb-1.5 flex justify-between px-2">
		<span v-if="deadTitle" class="text-xs italic text-neutral-500">{{ title }}</span>
		<span v-else class="text-xs">{{ title }}</span>
		<span class="text-xs text-neutral-400"><button @click="share" class="underline">Share</button> | {{ date ?? "Unknown date" }}</span>
	</div>
	<div class="flex grow flex-col overflow-hidden rounded-sm bg-neutral-900 text-left ring-1 ring-neutral-700">
		<div v-html="content" class="flex h-0 w-full grow overflow-y-scroll break-all bg-transparent px-3 py-1.5 text-xs outline-none"></div>
		<div class="flex justify-between border-t border-neutral-700 px-3 py-1.5 text-xs text-neutral-400">
			<span>Plain text</span>
			<span>{{ chars ?? "-" }} characters | {{ size ?? "-" }} KB</span>
		</div>
	</div>
</template>
