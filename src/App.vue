<script setup lang="ts"></script>

<template>
	<div class="mx-auto flex h-screen w-[550px] flex-col gap-8 py-8 text-center">
		<div class="flex flex-col">
			<h1>squidpaste</h1>
			<h3>Anonymous Text Sharing</h3>
		</div>
		<div class="flex grow flex-col">
			<router-view />
		</div>
		<div class="flex justify-center gap-2 text-sm [&>span]:font-bold [&>span]:text-neutral-600">
			<router-link :to="{ path: '/' }">New paste</router-link>
			<span>/</span>
			<router-link :to="{ path: '/privacy' }">Privacy</router-link>
			<span>/</span>
			<router-link :to="{ path: '/help' }">Help</router-link>
		</div>
	</div>
</template>
