<script lang="ts">
	import { userState } from '$lib/state.svelte';
	import { ArrowLeft, CheckCircle2, Circle, Play } from '@lucide/svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const course = $derived(data.course);
</script>

<div class="flex flex-col min-h-full pb-6">
	<!-- Header -->
	<div class="{course.color} text-white p-6 rounded-b-[2.5rem] shadow-lg relative">
		<a href="/" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors mb-4 backdrop-blur-sm">
			<ArrowLeft size={20} />
		</a>
		<h1 class="text-3xl font-extrabold mb-2">{course.title}</h1>
		<p class="text-white/80 text-sm leading-relaxed">{course.description}</p>
	</div>

	<!-- Syllabus -->
	<div class="px-5 mt-8 flex-1">
		<h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
			Syllabus
			<span class="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{course.lessons.length} lessons</span>
		</h2>

		<div class="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
			{#each course.lessons as lesson, index}
				{@const isCompleted = userState.completedLessons.includes(lesson.id)}
				<a href="/{course.id}/{lesson.id}" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
					<!-- Timeline Node -->
					<div class="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white {isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500 group-hover:bg-indigo-100'} shadow-sm z-10 shrink-0 transition-colors">
						{#if isCompleted}
							<CheckCircle2 size={24} />
						{:else}
							<span class="font-bold">{index + 1}</span>
						{/if}
					</div>

					<!-- Card -->
					<div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white border {isCompleted ? 'border-green-100 bg-green-50/30' : 'border-slate-100'} shadow-sm group-hover:shadow-md transition-all ml-4 md:ml-0">
						<div class="flex justify-between items-start mb-1">
							<h3 class="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{lesson.title}</h3>
						</div>
						<div class="flex items-center justify-between mt-3">
							<span class="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
								<Play size={12} /> Start Lesson
							</span>
							{#if isCompleted}
								<span class="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">Done</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
