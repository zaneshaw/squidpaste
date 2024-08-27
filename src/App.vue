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
			<router-link :to="{ path: '/' }">New Paste</router-link>
			<span>/</span>
			<router-link :to="{ path: '/help' }">Help</router-link>
			<span>/</span>
			<router-link :to="{ path: '/help', hash: '#api' }">API</router-link>
			<span>/</span>
			<router-link :to="{ path: '/security' }">Security Disclaimer</router-link>
		</div>
	</div>
</template>
