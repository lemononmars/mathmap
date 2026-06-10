<script lang="ts">
	import '../app.css';
	import { userState } from '$lib/state.svelte';
	import { Home, Trophy, Medal, Map } from '@lucide/svelte';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
	<!-- Top App Bar -->
	<header class="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md z-10 sticky top-0">
		<a href="/reference" class="font-bold text-xl flex items-center gap-2 hover:text-indigo-200 transition-colors" title="Reference Page">
			<Map size={24} />
			MathQuest
		</a>
		<div class="flex items-center gap-4 bg-indigo-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-indigo-500 shadow-inner">
			<div class="flex items-center gap-1 text-yellow-300" title="Points">
				<Trophy size={16} />
				<span>{userState.points}</span>
			</div>
			<div class="w-px h-4 bg-indigo-500"></div>
			<div class="flex items-center gap-1 text-sky-300" title="Badges">
				<Medal size={16} />
				<span>{userState.badges.length}</span>
			</div>
		</div>
	</header>

	<!-- Main Content Area -->
	<main class="flex-1 overflow-y-auto pb-20 bg-gray-50">
		{@render children()}
	</main>

	<!-- Bottom Navigation Bar -->
	<nav class="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md flex justify-around p-3 pb-5 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
		<a href="/" class="flex flex-col items-center p-2 rounded-xl transition-colors hover:bg-indigo-50 text-gray-500 hover:text-indigo-600">
			<Home size={24} />
			<span class="text-[10px] font-medium mt-1 uppercase tracking-wider">Courses</span>
		</a>
		<a href="/leaderboard" class="flex flex-col items-center p-2 rounded-xl transition-colors hover:bg-indigo-50 text-gray-500 hover:text-indigo-600">
			<Trophy size={24} />
			<span class="text-[10px] font-medium mt-1 uppercase tracking-wider">Rank</span>
		</a>
	</nav>
</div>
