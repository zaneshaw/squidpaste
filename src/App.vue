<script setup lang="ts">
import { ref } from "vue";

const abc = ref("");
</script>

<template>
	<div class="mx-auto flex h-screen w-[550px] flex-col gap-8 py-8 text-center">
		<div class="flex flex-col">
			<h1>squidpaste</h1>
			<h2>Anonymous Text Sharing</h2>
		</div>
		<div class="flex grow flex-col gap-2">
			<div class="flex grow flex-col overflow-hidden rounded-sm bg-neutral-900 text-left ring-1 ring-neutral-700">
				<label for="paste-title" class="text-3xs relative flex cursor-text flex-col border-b border-neutral-700 px-3 py-1.5 text-neutral-400">
					<span>Paste name</span>
					<input
						type="text"
						maxlength="48"
						id="paste-title"
						placeholder="A very cool name"
						v-model="abc"
						class="w-full grow bg-transparent text-xs text-neutral-300 outline-none"
					/>
					<span class="text-2xs pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">{{ abc.length }}/48</span>
				</label>
				<textarea class="h-full w-full grow resize-none bg-transparent px-3 py-1.5 text-xs outline-none">text content&#10;[link](https://example.com)</textarea>
				<div class="flex justify-between border-t border-neutral-700 px-3 py-1.5 text-xs text-neutral-400">
					<select class="-ml-1 bg-transparent outline-none [&>*]:bg-neutral-900">
						<option>Plain text</option>
						<option>C</option>
						<option>C++</option>
						<option>C#</option>
						<option>JavaScript</option>
					</select>
					<span>12 characters | ~1 KB</span>
				</div>
			</div>
			<div class="flex gap-2">
				<div class="flex grow overflow-hidden rounded-sm ring-1 ring-neutral-700">
					<div class="flex aspect-square h-full items-center justify-center bg-neutral-700 text-sm">🔒</div>
					<input type="password" placeholder="Optional password" maxlength="32" class="grow bg-neutral-900 px-2 text-sm outline-none" />
				</div>
				<button class="rounded-sm bg-neutral-700 px-5 py-0.5 text-sm text-white transition-colors duration-75 hover:bg-neutral-600">Create paste</button>
			</div>
			<div class="text-2xs flex flex-col gap-2 text-neutral-400">
				<div>
					<p>Pastes are anonymous and stored permanently until deleted.</p>
					<p>Password-protect any paste that contains sensitive information.</p>
				</div>
				<p>Pastes are limited to a maximum size of 128 KB.</p>
			</div>
		</div>
		<div class="flex justify-center gap-2 text-sm [&>span]:font-bold [&>span]:text-neutral-600">
			<a href="/">New Paste</a>
			<span>/</span>
			<a href="/help">Help</a>
			<span>/</span>
			<a href="/help#api">API</a>
			<span>/</span>
			<a href="/contact">Contact</a>
			<span>/</span>
			<a href="/security">Security Disclaimer</a>
		</div>
	</div>
</template>
