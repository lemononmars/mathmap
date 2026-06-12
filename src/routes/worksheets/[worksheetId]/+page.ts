import { error } from '@sveltejs/kit';
import { worksheets } from '$lib/courses';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const worksheet = worksheets.find((w) => w.id === params.worksheetId);

	if (!worksheet) {
		throw error(404, 'Worksheet not found');
	}

	return {
		worksheet
	};
};
