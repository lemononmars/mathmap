<script lang="ts">
	import { courses } from '$lib/courses';
	import { ArrowLeft } from '@lucide/svelte';
</script>

<div class="flex flex-col min-h-screen bg-white pb-20">
	<!-- Top Nav -->
	<div class="p-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
		<a href="/" class="text-gray-500 hover:text-gray-800 transition-colors p-2 -ml-2">
			<ArrowLeft size={24} />
		</a>
		<div class="ml-2 font-bold text-lg text-gray-800 truncate">Course Reference</div>
	</div>

	<div class="p-6">
		<h1 class="text-3xl font-extrabold mb-8 text-center text-indigo-700">All Lectures Reference</h1>

		<div class="space-y-12">
			{#each courses as course}
				<div class="border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
					<div class="{course.color} text-white p-6">
						<h2 class="text-2xl font-bold">{course.title}</h2>
						<p class="text-white/80 text-sm mt-2">{course.description}</p>
					</div>

					<div class="p-6 space-y-10">
						{#each course.lessons as lesson, i}
							<div>
								<h3 class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Section {i + 1}: {lesson.title}</h3>
								<div class="prose prose-indigo max-w-none text-gray-700 leading-relaxed text-lg">
									{@html lesson.content}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
