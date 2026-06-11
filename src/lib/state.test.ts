import { describe, it, expect, beforeEach } from 'vitest';
import { userState, setGuestMode } from './state.svelte';

describe('setGuestMode', () => {
	beforeEach(() => {
		// Reset the state to some non-default values to ensure setGuestMode actually resets them
		userState.isGuest = false;
		userState.points = 100;
		userState.badges = ['first-blood'];
		userState.completedLessons = ['lesson-1'];
	});

	it('should set isGuest to true and reset user progress', () => {
		setGuestMode();

		expect(userState.isGuest).toBe(true);
		expect(userState.points).toBe(0);
		expect(userState.badges).toEqual([]);
		expect(userState.completedLessons).toEqual([]);
	});
});
