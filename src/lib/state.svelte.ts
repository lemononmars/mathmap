import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

type UserState = {
	user: User | null;
	points: number;
	badges: string[];
	completedLessons: string[];
};

export const userState = $state<UserState>({
	user: null,
	points: 0,
	badges: [],
	completedLessons: []
});

export async function initAuth() {
	if (!supabase) {
		console.warn('Supabase client is not initialized. Auth features are disabled.');
		return;
	}

	const { data: { session } } = await supabase.auth.getSession();
	userState.user = session?.user ?? null;
	if (userState.user) {
		await loadProgress();
	}

	supabase.auth.onAuthStateChange(async (_event, session) => {
		const currentUser = session?.user ?? null;
		if (userState.user?.id !== currentUser?.id) {
			userState.user = currentUser;
			if (userState.user) {
				await loadProgress();
			} else {
				// Reset state on sign out
				userState.points = 0;
				userState.badges = [];
				userState.completedLessons = [];
			}
		}
	});
}

export async function loadProgress() {
	if (!userState.user || !supabase) return;

	const { data, error } = await supabase
		.from('profiles')
		.select('points, badges, completed_lessons')
		.eq('user_id', userState.user.id)
		.single();

	if (error) {
		console.error('Error loading progress:', error);
		return;
	}

	if (data) {
		userState.points = data.points || 0;
		userState.badges = data.badges || [];
		userState.completedLessons = data.completed_lessons || [];
	}
}

export async function syncProgress() {
	if (!userState.user || !supabase) return;

	const { error } = await supabase
		.from('profiles')
		.update({
			points: userState.points,
			badges: userState.badges,
			completed_lessons: userState.completedLessons,
			updated_at: new Date().toISOString()
		})
		.eq('user_id', userState.user.id);

	if (error) {
		console.error('Error syncing progress:', error);
	}
}

export function addPoints(amount: number) {
	userState.points += amount;
	syncProgress();
}

export function unlockBadge(badgeId: string) {
	if (!userState.badges.includes(badgeId)) {
		userState.badges.push(badgeId);
		syncProgress();
	}
}

export function completeLesson(lessonId: string) {
	if (!userState.completedLessons.includes(lessonId)) {
		userState.completedLessons.push(lessonId);
		syncProgress();
	}
}
