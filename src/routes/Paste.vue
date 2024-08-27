<template>
	<div class="mb-1.5 flex justify-between px-2">
		<span class="text-xs">{{ $route.params.pasteId }}</span>
		<span class="text-xs text-neutral-400">5 days ago</span>
	</div>
	<div class="flex grow flex-col overflow-hidden rounded-sm bg-neutral-900 text-left ring-1 ring-neutral-700">
		<div class="h-full w-full grow resize-none bg-transparent px-3 py-1.5 text-xs outline-none">
			<p>text content</p>
			<a href="https://example.com" target="_blank">link</a>
		</div>
		<div class="flex justify-between border-t border-neutral-700 px-3 py-1.5 text-xs text-neutral-400">
			<span>Plain text</span>
			<span>12 characters | ~1 KB</span>
		</div>
	</div>
</template>
