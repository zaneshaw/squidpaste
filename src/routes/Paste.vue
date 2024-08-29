<script setup lang="ts">
import { computed, Ref, ref, watch } from "vue";
import { getPaste, PasteError } from "../api.ts";
import { useRoute } from "vue-router";
import { DateTime } from "luxon";
import { useClipboard } from "@vueuse/core";
import Paste from "../components/Paste.vue";

const loading = ref(false);
const authorised = ref(true);
const paste: Ref<any> = ref(null);
const error: Ref<PasteError | null> = ref(null);

const password = ref("");

const { copy } = useClipboard();

const pasteDate = computed(() => {
	const date = DateTime.fromISO(paste.value.dateModified);
	const secondsAgo = Math.abs(date.diffNow().as("seconds"));
	if (secondsAgo < 60) {
		return "Just now";
	} else {
		return date.toRelative();
	}
});
const pasteChars = computed(() => paste.value.content.length);
const pasteSize = computed(() => Math.ceil(new Blob([paste.value.content]).size / 1000));

const route = useRoute();

watch(
	() => route.params.pasteId,
	() => fetchData(),
	{ immediate: true }
);

async function fetchData(password: string | undefined = undefined) {
	error.value = paste.value = null;
	loading.value = true;

	try {
		paste.value = await getPaste(route.params?.pasteId as string, password);
		authorised.value = true;
	} catch (err: any) {
		error.value = err;
		if (error.value?.status == 401) {
			authorised.value = false;
		}
	} finally {
		loading.value = false;
	}
}

async function unlock() {
	if (!authorised.value) {
		fetchData(password.value);
	}
}

async function share() {
	copy(window.location.href);
	alert("Copied to clipboard.");
}
</script>

<template>
	<template v-if="!authorised">
		<div
			class="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-sm bg-neutral-800 px-5 py-3 ring-1 ring-neutral-700"
		>
			<div class="flex flex-col gap-1 pr-10">
				<h3>🔒This paste is password-protected.</h3>
				<span class="text-left text-sm text-neutral-500">Enter the password to unlock it.</span>
			</div>
			<div class="flex gap-1">
				<input
					type="password"
					placeholder="Password"
					v-model="password"
					class="grow rounded-sm bg-neutral-900 px-2 text-sm outline-none ring-1 ring-neutral-700"
				/>
				<button type="button" @click="unlock" class="btn">Unlock</button>
			</div>
		</div>
		<div class="flex grow flex-col opacity-50 blur-[2px]">
			<Paste title="Locked Paste" :deadTitle="true" />
		</div>
	</template>
	<template v-else-if="loading">
		<span>Loading...</span>
	</template>
	<template v-else-if="error">
		<h2>{{ error.status }}</h2>
		<span class="text-sm">{{ error.message }}</span>
	</template>
	<template v-else-if="paste">
		<Paste :title="paste.title || 'Unnamed Paste'" :content="paste.content" :date="pasteDate" :chars="pasteChars" :size="pasteSize" :deadTitle="!paste.title" />
	</template>
</template>
