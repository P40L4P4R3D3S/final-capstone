// immutable list of students with their grades
const students = Object.freeze([
	{ name: 'Alice', grades: [85, 90, 78] },
	{ name: 'Bob', grades: [92, 88, 95] },
	{ name: 'Charlie', grades: [70, 75, 80] },
	{ name: 'Diana', grades: [88, 84, 89] },
	{ name: 'Ethan', grades: [95, 97, 99] },
]);

// Pure function
const calculateAverage = (grades) =>
	grades.reduce((sum, grade) => sum + grade, 0) / grades.length;

// Map each student to a new object with their average
const studentsWithAverages = students.map((student) => ({
	name: student.name,
	average: calculateAverage(student.grades),
}));

// Find the BEST student
const bestStudent = studentsWithAverages.reduce((best, current) =>
	current.average > best.average ? current : best
);

console.log('Students and averages');
studentsWithAverages.forEach((s) =>
	console.log(`${s.name}: ${s.average.toFixed(2)}`)
);

console.log('\nBest Student');
console.log(
	`${bestStudent.name} with an average of ${bestStudent.average.toFixed(2)}`
);
