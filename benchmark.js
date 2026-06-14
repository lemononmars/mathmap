import { performance } from 'perf_hooks';

// Setup mock data
const numCourses = 10;
const numCompleted = 5000;
const numCourseLessons = 1000;

const completedLessons = Array.from({ length: numCompleted }, (_, i) => `lesson-${i}`);

const courses = Array.from({ length: numCourses }, (_, c) => ({
    lessons: Array.from({ length: numCourseLessons }, (_, i) => ({ id: `lesson-${c * 1000 + i}` }))
}));

function simulateOld() {
    let totalCompleted = 0;
    for (const course of courses) {
        const completedInCourse = course.lessons.filter((l) => completedLessons.includes(l.id)).length;
        totalCompleted += completedInCourse;
    }
    return totalCompleted;
}

function simulateNew() {
    let totalCompleted = 0;
    const completedSet = new Set(completedLessons);
    for (const course of courses) {
        const completedInCourse = course.lessons.filter((l) => completedSet.has(l.id)).length;
        totalCompleted += completedInCourse;
    }
    return totalCompleted;
}

// Warm up
for (let i = 0; i < 10; i++) {
    simulateOld();
    simulateNew();
}

const startOld = performance.now();
for (let i = 0; i < 100; i++) {
    simulateOld();
}
const endOld = performance.now();

const startNew = performance.now();
for (let i = 0; i < 100; i++) {
    simulateNew();
}
const endNew = performance.now();

console.log(`Old approach time: ${(endOld - startOld).toFixed(2)} ms`);
console.log(`New approach time: ${(endNew - startNew).toFixed(2)} ms`);
console.log(`Improvement: ${(((endOld - startOld) - (endNew - startNew)) / (endOld - startOld) * 100).toFixed(2)}% faster`);
console.log(`Speed multiplier: ${((endOld - startOld) / (endNew - startNew)).toFixed(2)}x`);
