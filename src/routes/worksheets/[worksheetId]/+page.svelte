<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const worksheet = $derived(data.worksheet);
</script>

<div class="flex flex-col min-h-screen bg-white pb-20">
	<!-- Top Nav -->
	<div class="p-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
		<a href="/worksheets" class="text-gray-500 hover:text-gray-800 transition-colors p-2 -ml-2">
			<ArrowLeft size={24} />
		</a>
		<div class="ml-2 font-bold text-lg text-gray-800 truncate">{worksheet.title}</div>
	</div>

	<!-- Content -->
	<div class="p-6">
		<div class="space-y-8">
			{#each worksheet.questions as question, index}
				<div class="bg-gray-50 rounded-2xl p-6 border border-gray-200">
					<div class="flex gap-4">
						<div class="font-bold text-indigo-600 text-lg">{index + 1}.</div>
						<div class="flex-1">
							<div class="prose prose-indigo max-w-none text-gray-800 mb-6 font-medium">
								{@html question.question}
							</div>

							<div class="mt-4">
								<details class="group bg-white rounded-xl border border-indigo-100 overflow-hidden">
									<summary class="flex items-center justify-between p-4 font-bold text-indigo-700 cursor-pointer hover:bg-indigo-50 transition-colors list-none">
										<span>Show Solution</span>
										<span class="transition-transform group-open:rotate-180">
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
										</span>
									</summary>
									<div class="p-4 border-t border-indigo-50 bg-indigo-50/30 prose prose-indigo max-w-none text-gray-700">
										{#if question.solution && question.solution !== 'N/A'}
											{@html question.solution}
										{:else}
											<div class="italic text-gray-500">N/A</div>
										{/if}
									</div>
								</details>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
