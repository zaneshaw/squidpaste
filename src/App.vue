<script setup lang="ts"></script>

<template>
	<div class="mx-auto flex h-screen w-[550px] flex-col gap-10 py-10 text-center">
		<div class="flex flex-col gap-5">
			<div class="relative mx-auto flex w-fit flex-col">
				<h1>squidpaste</h1>
				<span class="absolute -bottom-4 -right-5 text-sm">yummy</span>
			</div>
			<h2>Anonymous Text Sharing</h2>
		</div>
		<div class="flex grow flex-col gap-2">
			<div class="grow ring-1 ring-white"></div>
			<div class="flex flex-col gap-2 text-xs">
				<div>
					<p>All pastes are anonymous and stored permanently until deleted.</p>
					<p>Make sure to setup a password for any paste that contains sensitive information.</p>
				</div>
				<p>Pastes are limited to a maximum size of 128 KB.</p>
			</div>
		</div>
		<div class="flex justify-center gap-2">
			<a href="">New Paste</a>
			<span>/</span>
			<a href="">Help</a>
			<span>/</span>
			<a href="">API</a>
			<span>/</span>
			<a href="">Contact</a>
			<span>/</span>
			<a href="">Security Disclaimer</a>
		</div>
	</div>
</template>
