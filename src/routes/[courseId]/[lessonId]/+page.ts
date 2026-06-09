import { error } from '@sveltejs/kit';
import { courses } from '$lib/courses';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const course = courses.find((c) => c.id === params.courseId);
	if (!course) throw error(404, 'Course not found');

	const lesson = course.lessons.find((l) => l.id === params.lessonId);
	if (!lesson) throw error(404, 'Lesson not found');

	return {
		course,
		lesson
	};
};
