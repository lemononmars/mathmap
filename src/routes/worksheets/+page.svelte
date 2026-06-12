<script lang="ts">
	import { worksheets } from '$lib/courses';
	import { FileText, PlayCircle } from '@lucide/svelte';
</script>

<div class="p-4 space-y-6">
	<div>
		<h1 class="text-2xl font-extrabold text-gray-900 mb-1">Worksheets</h1>
		<p class="text-sm text-gray-500">Practice your skills and check your solutions!</p>
	</div>

	<div class="space-y-4">
		{#each worksheets as worksheet}
			<a href="/worksheets/{worksheet.id}" class="block group">
				<div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-indigo-100 relative overflow-hidden">
					<div class="flex items-start gap-4">
						<div class="bg-indigo-500 text-white p-3 rounded-xl shadow-inner mt-1">
							<FileText size={24} />
						</div>
						<div class="flex-1">
							<div class="flex justify-between items-start">
								<h2 class="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{worksheet.title}</h2>
							</div>
							<p class="text-sm text-gray-500 mt-1 mb-3 line-clamp-2">Test your knowledge with {worksheet.questions.length} questions.</p>

							<div class="flex items-center justify-between mt-auto">
								<span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">{worksheet.questions.length} Questions</span>
								<span class="text-indigo-500">
									<PlayCircle size={20} />
								</span>
							</div>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
