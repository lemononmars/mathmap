type UserState = {
	points: number;
	badges: string[];
	completedLessons: string[];
};

export const userState = $state<UserState>({
	points: 0,
	badges: [],
	completedLessons: []
});

export function addPoints(amount: number) {
	userState.points += amount;
}

export function unlockBadge(badgeId: string) {
	if (!userState.badges.includes(badgeId)) {
		userState.badges.push(badgeId);
	}
}

export function completeLesson(lessonId: string) {
	if (!userState.completedLessons.includes(lessonId)) {
		userState.completedLessons.push(lessonId);
	}
}
