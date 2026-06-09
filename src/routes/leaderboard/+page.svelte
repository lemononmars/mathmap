<script lang="ts">
	import { userState } from '$lib/state.svelte';
	import { Trophy, Medal, User } from '@lucide/svelte';

	type LeaderboardUser = {
		name: string;
		points: number;
		avatar: string;
		isCurrentUser?: boolean;
	};

	// Mock leaderboard data
	const mockUsers: LeaderboardUser[] = [
		{ name: 'Alice M.', points: 150, avatar: 'bg-pink-500' },
		{ name: 'Bob T.', points: 120, avatar: 'bg-blue-500' },
		{ name: 'Charlie D.', points: 90, avatar: 'bg-green-500' },
		{ name: 'Diana R.', points: 60, avatar: 'bg-purple-500' },
		{ name: 'Eve S.', points: 30, avatar: 'bg-yellow-500' }
	];

	// Insert current user and sort
	const leaderboard = $derived(() => {
		const currentUser: LeaderboardUser = {
			name: 'You',
			points: userState.points,
			avatar: 'bg-indigo-600',
			isCurrentUser: true
		};

		const allUsers = [...mockUsers, currentUser];
		return allUsers.sort((a, b) => b.points - a.points);
	});

	function getRankStyle(index: number) {
		switch (index) {
			case 0: return 'text-yellow-500 bg-yellow-50 border-yellow-200';
			case 1: return 'text-gray-400 bg-gray-50 border-gray-200';
			case 2: return 'text-amber-600 bg-amber-50 border-amber-200';
			default: return 'text-slate-600 bg-white border-slate-100';
		}
	}
</script>

<div class="p-6">
	<div class="text-center mb-8">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4 shadow-inner">
			<Trophy size={32} />
		</div>
		<h1 class="text-3xl font-extrabold text-gray-900 mb-2">Leaderboard</h1>
		<p class="text-gray-500">Compete with other math wizards!</p>
	</div>

	<div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
		{#each leaderboard() as user, index}
			<div class="flex items-center p-4 border-b border-gray-50 last:border-0 {user.isCurrentUser ? 'bg-indigo-50/50' : ''} transition-colors">
				<div class="w-10 font-bold text-lg text-center {index < 3 ? getRankStyle(index).split(' ')[0] : 'text-slate-400'}">
					{index + 1}
				</div>

				<div class="w-12 h-12 rounded-full {user.avatar} flex items-center justify-center text-white font-bold shadow-sm shrink-0">
					{#if user.isCurrentUser}
						<User size={20} />
					{:else}
						{user.name.charAt(0)}
					{/if}
				</div>

				<div class="ml-4 flex-1">
					<div class="font-bold text-gray-800 {user.isCurrentUser ? 'text-indigo-700' : ''}">
						{user.name}
					</div>
					{#if user.isCurrentUser && userState.badges.length > 0}
						<div class="text-xs text-sky-600 flex items-center gap-1 mt-0.5">
							<Medal size={12} /> {userState.badges.length} badges
						</div>
					{/if}
				</div>

				<div class="font-extrabold text-gray-700 {user.isCurrentUser ? 'text-indigo-700' : ''}">
					{user.points} <span class="text-xs font-normal text-gray-400 uppercase">pts</span>
				</div>
			</div>
		{/each}
	</div>
</div>
