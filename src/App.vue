<script setup lang="ts"></script>

<template>
	<div class="mx-auto flex h-screen w-[550px] flex-col gap-8 py-8 text-center">
		<div class="flex flex-col">
			<h1>squidpaste</h1>
			<h2>Anonymous Text Sharing</h2>
		</div>
		<div class="flex grow flex-col">
			<router-view />
		</div>
		<div class="flex justify-center gap-2 text-sm [&>span]:font-bold [&>span]:text-neutral-600">
			<a href="/">New Paste</a>
			<span>/</span>
			<a href="/help">Help</a>
			<span>/</span>
			<a href="/help#api">API</a>
			<span>/</span>
			<a href="/security">Security Disclaimer</a>
		</div>
	</div>
</template>
