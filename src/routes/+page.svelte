<script lang="ts">
	import { courses } from '$lib/courses';
	import { userState } from '$lib/state.svelte';
	import { FunctionSquare, Triangle, PlayCircle, CheckCircle } from '@lucide/svelte';

	function getIcon(iconName: string) {
		switch (iconName) {
			case 'FunctionSquare':
				return FunctionSquare;
			case 'Triangle':
				return Triangle;
			default:
				return PlayCircle;
		}
	}

	function getCourseProgress(course: typeof courses[0]) {
		const completedInCourse = course.lessons.filter((l) => userState.completedLessons.includes(l.id)).length;
		return {
			completed: completedInCourse,
			total: course.lessons.length,
			percentage: Math.round((completedInCourse / course.lessons.length) * 100)
		};
	}
</script>

<div class="p-4 space-y-6">
	<div>
		<h1 class="text-2xl font-extrabold text-gray-900 mb-1">Your Courses</h1>
		<p class="text-sm text-gray-500">Pick up where you left off!</p>
	</div>

	<div class="space-y-4">
		{#each courses as course}
			{@const progress = getCourseProgress(course)}
			{@const IconComponent = getIcon(course.icon)}

			<a href="/{course.id}" class="block group">
				<div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-indigo-100 relative overflow-hidden">
					<!-- Progress Background Bar -->
					<div class="absolute bottom-0 left-0 h-1 {course.color} bg-opacity-20 w-full"></div>
					<div class="absolute bottom-0 left-0 h-1 {course.color} transition-all duration-500" style="width: {progress.percentage}%;"></div>

					<div class="flex items-start gap-4">
						<div class="{course.color} text-white p-3 rounded-xl shadow-inner mt-1">
							<IconComponent size={24} />
						</div>
						<div class="flex-1">
							<div class="flex justify-between items-start">
								<h2 class="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{course.title}</h2>
								{#if progress.completed === progress.total}
									<div class="bg-green-100 text-green-600 p-1 rounded-full">
										<CheckCircle size={16} />
									</div>
								{/if}
							</div>
							<p class="text-sm text-gray-500 mt-1 mb-3 line-clamp-2">{course.description}</p>

							<div class="flex items-center justify-between mt-auto">
								<span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">{progress.completed} / {progress.total} lessons</span>
								<span class="text-xs font-bold {progress.percentage === 100 ? 'text-green-500' : 'text-indigo-500'}">{progress.percentage}%</span>
							</div>
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
