import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

type UserState = {
	user: User | null;
	isGuest: boolean;
	points: number;
	badges: string[];
	completedLessons: string[];
};

export const userState = $state<UserState>({
	user: null,
	isGuest: false,
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
				userState.isGuest = false;
				userState.points = 0;
				userState.badges = [];
				userState.completedLessons = [];
			}
		}
	});
}

export async function loadProgress() {
	if (userState.isGuest || !userState.user || !supabase) return;

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

export function setGuestMode() {
	userState.isGuest = true;
	userState.points = 0;
	userState.badges = [];
	userState.completedLessons = [];
}

export async function completeLesson(lessonId: string, courseId: string) {
	if (!userState.completedLessons.includes(lessonId)) {
		// Optimistic update
		userState.completedLessons.push(lessonId);
		userState.points += 10;

		if (courseId === 'calculus-1' && !userState.badges.includes('calc-novice')) {
			userState.badges.push('calc-novice');
		}
		if (courseId === 'precalculus' && !userState.badges.includes('precalc-pro')) {
			userState.badges.push('precalc-pro');
		}

		if (userState.isGuest || !userState.user || !supabase) return;

		// Server sync
		const { error } = await supabase.rpc('complete_lesson', {
			p_lesson_id: lessonId,
			p_course_id: courseId
		});

		if (error) {
			console.error('Error syncing lesson completion:', error);
			// Optionally reload progress on error to revert optimistic update
			await loadProgress();
		}
	}
}
