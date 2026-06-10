<script lang="ts">
	import '../app.css';
	import { userState, initAuth, setGuestMode } from '$lib/state.svelte';
	import { supabase } from '$lib/supabase';
	import { Home, Trophy, Medal, Map, LogOut, LogIn } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		initAuth();
	});

	async function signInWithGoogle() {
		if (!supabase) {
			console.warn('Supabase client is not initialized. Sign in is disabled.');
			return;
		}
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.origin
			}
		});
	}

	async function signOut() {
		if (!supabase) return;
		await supabase.auth.signOut();
	}
</script>

<div class="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
	{#if userState.user === null && !userState.isGuest}
		<!-- Login Screen -->
		<div class="flex-1 flex flex-col items-center justify-center bg-indigo-50 p-6 text-center h-screen">
			<div class="bg-indigo-600 text-white p-6 rounded-full mb-6 shadow-lg">
				<Map size={48} />
			</div>
			<h1 class="text-3xl font-extrabold text-indigo-900 mb-2">MathQuest</h1>
			<p class="text-indigo-600 mb-8">Embark on your mathematical journey!</p>

			<button
				onclick={signInWithGoogle}
				class="flex items-center gap-3 bg-white text-gray-800 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200"
			>
				<svg class="w-5 h-5" viewBox="0 0 24 24">
					<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
					<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
					<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
					<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
				</svg>
				Sign in with Google
			</button>

			<button
				onclick={setGuestMode}
				class="mt-4 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
			>
				Play without account
			</button>
		</div>
	{:else}
		<!-- Main App Layout -->
		<!-- Top App Bar -->
		<header class="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md z-10 sticky top-0">
			<div class="font-bold text-xl flex items-center gap-2">
				<Map size={24} />
				MathQuest
			</div>
			<div class="flex items-center gap-4">
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
				<button onclick={signOut} class="p-2 hover:bg-indigo-700 rounded-full transition-colors" title="Sign Out" aria-label="Sign Out">
					<LogOut size={20} />
				</button>
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
	{/if}
</div>
