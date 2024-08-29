<script setup lang="ts">
import { computed, ref } from "vue";
import { router } from "../main";
import { newPaste } from "../api";

const pasteTitle = ref("");
const pasteContent = ref("");
const password = ref("");

const pasteChars = computed(() => pasteContent.value.length);
const pasteSize = computed(() => Math.ceil(new Blob([pasteContent.value]).size / 1000));

async function onNewPaste() {
	try {
		const id = await newPaste(pasteTitle.value, pasteContent.value, "plain-text", password.value);
		router.push({ path: `/${id}` });
	} catch (err) {
		// console.log(err);
	}
}
</script>

<template>
	<div class="flex grow flex-col gap-2">
		<div class="flex grow flex-col overflow-hidden rounded-sm bg-neutral-900 text-left ring-1 ring-neutral-700">
			<label for="paste-title" class="relative flex cursor-text flex-col border-b border-neutral-700 px-3 py-1.5 text-3xs text-neutral-400">
				<span>Paste name</span>
				<input
					type="text"
					maxlength="48"
					id="paste-title"
					placeholder="A very cool name"
					autocomplete="off"
					data-1p-ignore
					data-lpignore="true"
					v-model="pasteTitle"
					class="w-full grow bg-transparent text-xs text-neutral-300 outline-none"
				/>
				<span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-2xs">{{ pasteTitle.length }}/48</span>
			</label>
			<textarea
				autocomplete="off"
				data-1p-ignore
				data-lpignore="true"
				v-model="pasteContent"
				class="h-full w-full grow resize-none bg-transparent px-3 py-1.5 text-xs outline-none"
			>
text content&#10;[link](https://example.com)</textarea
			>
			<div class="flex justify-between border-t border-neutral-700 px-3 py-1.5 text-xs text-neutral-400">
				<select class="-ml-1 bg-transparent outline-none [&>*]:bg-neutral-900">
					<option>Plain text</option>
				</select>
				<span>{{ pasteChars }} characters | {{ pasteSize }} KB</span>
			</div>
		</div>
		<div class="flex gap-2">
			<div class="flex grow overflow-hidden rounded-sm ring-1 ring-neutral-700">
				<div class="flex aspect-square h-full items-center justify-center bg-neutral-700 text-sm">🔒</div>
				<input type="password" placeholder="Optional password" maxlength="32" v-model="password" class="grow bg-neutral-900 px-2 text-sm outline-none" />
			</div>
			<button @click="onNewPaste" class="btn">Create paste</button>
		</div>
		<div class="flex flex-col gap-2 text-2xs text-neutral-400">
			<div>
				<p>Pastes are fully anonymous and stored permanently.</p>
				<p>Password-protect any paste that contains sensitive information.</p>
			</div>
			<p>Pastes are limited to a maximum size of 128 KB.</p>
		</div>
	</div>
</template>
