<script lang="ts">
	import { addPoints, completeLesson, unlockBadge } from '$lib/state.svelte';
	import { ArrowLeft, CheckCircle, XCircle, Trophy } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();
	const course = $derived(data.course);
	const lesson = $derived(data.lesson);

	let currentQuestionIndex = $state(0);
	let selectedOption = $state<number | null>(null);
	let showResult = $state(false);
	let isCorrect = $state(false);
	let quizFinished = $state(false);

	const currentQuestion = $derived(lesson.quiz[currentQuestionIndex]);

	function submitAnswer() {
		if (selectedOption === null) return;

		isCorrect = selectedOption === currentQuestion.correctOptionIndex;
		showResult = true;

		if (isCorrect) {
			addPoints(currentQuestion.points);
		}
	}

	function nextQuestion() {
		if (currentQuestionIndex < lesson.quiz.length - 1) {
			currentQuestionIndex++;
			selectedOption = null;
			showResult = false;
		} else {
			quizFinished = true;
			completeLesson(lesson.id);
			if (course.id === 'calculus-1') unlockBadge('calc-novice');
			if (course.id === 'precalculus') unlockBadge('precalc-pro');
		}
	}

	function finishLesson() {
		goto(`/${course.id}`);
	}
</script>

<div class="flex flex-col min-h-screen bg-white pb-20">
	<!-- Top Nav -->
	<div class="p-4 flex items-center border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
		<a href="/{course.id}" class="text-gray-500 hover:text-gray-800 transition-colors p-2 -ml-2">
			<ArrowLeft size={24} />
		</a>
		<div class="ml-2 font-bold text-lg text-gray-800 truncate">{lesson.title}</div>
	</div>

	{#if !quizFinished}
		<!-- Lesson Content -->
		<div class="p-6">
			<div class="prose prose-indigo max-w-none text-gray-700 leading-relaxed text-lg mb-8">
				<p>{lesson.content}</p>
			</div>

			<!-- Quiz Section -->
			<div class="mt-10 bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100">
				<h3 class="font-bold text-indigo-900 mb-6 text-xl">Knowledge Check</h3>

				<div class="mb-4">
					<p class="font-medium text-gray-800 text-lg mb-4">{currentQuestion.question}</p>

					<div class="space-y-3">
						{#each currentQuestion.options as option, index}
							<button
								class="w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-gray-700
									{showResult ?
										(index === currentQuestion.correctOptionIndex ? 'border-green-500 bg-green-50 text-green-700' :
										(index === selectedOption && !isCorrect ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 opacity-50')) :
										(selectedOption === index ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50')}
								"
								onclick={() => !showResult && (selectedOption = index)}
								disabled={showResult}
							>
								{option}
							</button>
						{/each}
					</div>
				</div>

				{#if showResult}
					<div class="mt-6 p-4 rounded-xl flex items-start gap-3 {isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
						{#if isCorrect}
							<CheckCircle class="shrink-0 mt-0.5 text-green-600" />
							<div>
								<div class="font-bold">Correct!</div>
								<div class="text-sm mt-1 opacity-90">+{currentQuestion.points} points</div>
							</div>
						{:else}
							<XCircle class="shrink-0 mt-0.5 text-red-600" />
							<div>
								<div class="font-bold">Not quite.</div>
								<div class="text-sm mt-1 opacity-90">The correct answer was {currentQuestion.options[currentQuestion.correctOptionIndex]}.</div>
							</div>
						{/if}
					</div>
				{/if}

				<div class="mt-8">
					{#if !showResult}
						<button
							class="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all shadow-md active:scale-[0.98]
								{selectedOption !== null ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}"
							disabled={selectedOption === null}
							onclick={submitAnswer}
						>
							Check Answer
						</button>
					{:else}
						<button
							class="w-full py-4 rounded-2xl font-bold text-white text-lg transition-all shadow-md active:scale-[0.98] {isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}"
							onclick={nextQuestion}
						>
							{currentQuestionIndex < lesson.quiz.length - 1 ? 'Next Question' : 'Finish Lesson'}
						</button>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<!-- Finished State -->
		<div class="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
			<div class="w-32 h-32 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
				<Trophy size={64} />
			</div>
			<h2 class="text-3xl font-extrabold text-gray-900 mb-2">Lesson Complete!</h2>
			<p class="text-gray-500 text-lg mb-8">Great job finishing {lesson.title}.</p>

			<button
				class="w-full max-w-xs py-4 rounded-2xl font-bold text-white text-lg bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg active:scale-[0.98]"
				onclick={finishLesson}
			>
				Continue Learning
			</button>
		</div>
	{/if}
</div>
