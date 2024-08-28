<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { getPaste } from "../api.ts";
import { useRoute } from "vue-router";

const loading = ref(false);
const paste: Ref<any> = ref(null);
const error: Ref<any> = ref(null);

const route = useRoute();

watch(() => route.params.pasteId, fetchData, { immediate: true });

async function fetchData() {
	error.value = paste.value = null;
	loading.value = true;

	try {
		paste.value = await getPaste(route.params?.pasteId as string);
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<template v-if="loading">
		<span>Loading...</span>
	</template>
	<template v-else-if="error">
		<h2>{{ error.status }}</h2>
		<span class="text-sm">{{ error.message }}</span>
	</template>
	<template v-else-if="paste">
		<div class="mb-1.5 flex justify-between px-2">
			<span class="text-xs">{{ paste.title }}</span>
			<span class="text-xs text-neutral-400">{{ new Date(paste.dateModified).toLocaleString("en-US", { hour12: true }) }}</span>
		</div>
		<div class="flex grow flex-col overflow-hidden rounded-sm bg-neutral-900 text-left ring-1 ring-neutral-700">
			<div v-html="paste.content" class="h-full w-full grow resize-none bg-transparent px-3 py-1.5 text-xs outline-none"></div>
			<div class="flex justify-between border-t border-neutral-700 px-3 py-1.5 text-xs text-neutral-400">
				<span>Plain text</span>
				<span>12 characters | ~1 KB</span>
			</div>
		</div>
	</template>
</template>
