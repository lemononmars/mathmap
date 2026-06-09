export type QuizQuestion = {
	id: string;
	question: string;
	options: string[];
	correctOptionIndex: number;
	points: number;
};

export type Lesson = {
	id: string;
	title: string;
	content: string;
	quiz: QuizQuestion[];
};

export type Course = {
	id: string;
	title: string;
	description: string;
	icon: string;
	color: string;
	lessons: Lesson[];
};

export const courses: Course[] = [
	{
		id: 'calculus-1',
		title: 'Calculus 1',
		description: 'The mathematics of continuous change.',
		icon: 'FunctionSquare',
		color: 'bg-blue-500',
		lessons: [
			{
				id: 'limits-intro',
				title: 'Introduction to Limits',
				content: 'A limit is the value that a function approaches as the input approaches some value. Limits are essential to calculus—and they are used to define continuity, derivatives, and integrals.',
				quiz: [
					{
						id: 'q1',
						question: 'What is the limit of f(x) = x + 2 as x approaches 3?',
						options: ['3', '5', '6', 'undefined'],
						correctOptionIndex: 1,
						points: 10
					}
				]
			},
			{
				id: 'derivatives-intro',
				title: 'Derivatives',
				content: 'The derivative of a function of a real variable measures the sensitivity to change of the function value (output value) with respect to a change in its argument (input value).',
				quiz: [
					{
						id: 'q2',
						question: 'What is the derivative of f(x) = x²?',
						options: ['x', '2x', 'x²', '2'],
						correctOptionIndex: 1,
						points: 15
					}
				]
			},
			{
				id: 'integrals-intro',
				title: 'Integrals',
				content: 'Integration is the algebraic method of finding the integral for a function at any point on the graph. Finding the integral of a function with respect to x means finding the area to the x axis from the curve.',
				quiz: [
					{
						id: 'q3',
						question: 'What is the indefinite integral of f(x) = 2x?',
						options: ['x + C', 'x² + C', '2x² + C', 'x³ + C'],
						correctOptionIndex: 1,
						points: 20
					}
				]
			}
		]
	},
	{
		id: 'precalculus',
		title: 'Precalculus',
		description: 'Foundation for Calculus.',
		icon: 'Triangle',
		color: 'bg-green-500',
		lessons: [
			{
				id: 'functions-intro',
				title: 'Functions',
				content: 'A function relates an input to an output. It is like a machine that has an input and an output. And the output is related somehow to the input.',
				quiz: [
					{
						id: 'q4',
						question: 'If f(x) = 3x - 1, what is f(2)?',
						options: ['2', '4', '5', '7'],
						correctOptionIndex: 2,
						points: 10
					}
				]
			},
			{
				id: 'trigonometry-intro',
				title: 'Trigonometry',
				content: 'Trigonometry is a branch of mathematics that studies relationships between side lengths and angles of triangles.',
				quiz: [
					{
						id: 'q5',
						question: 'In a right triangle, what is the sine of an angle?',
						options: ['Opposite / Hypotenuse', 'Adjacent / Hypotenuse', 'Opposite / Adjacent', 'Adjacent / Opposite'],
						correctOptionIndex: 0,
						points: 15
					}
				]
			}
		]
	}
];
