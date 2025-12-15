const fs = require('fs');

const readText = (path) => fs.readFileSync(path, 'utf8');

const normalizeText = (text) => text.toLowerCase();

const removePunctuation = (text) => text.replace(/[^\w\s]/g, '');

const tokenize = (text) => text.split(/\s+/);

const filterEmpty = (words) => words.filter((word) => word.length > 0);

const countFrequencies = (words) =>
	words.reduce((acc, word) => {
		acc[word] = (acc[word] || 0) + 1;
		return acc;
	}, {});

const sortByFrequency = (freqObj) =>
	Object.entries(freqObj).sort((a, b) => b[1] - a[1]);

const getTop5 = (sorted) => sorted.slice(0, 5);

const formatOutput = (pair) => `Palabra: '${pair[0]}' | Frecuencia: ${pair[1]}`;

const displayTop5 = (top5) =>
	top5.forEach((pair) => console.log(formatOutput(pair)));

const main = () => {
	const text = readText('../archivo.txt');
	const processedText = removePunctuation(normalizeText(text));
	const words = filterEmpty(tokenize(processedText));
	const frequencies = countFrequencies(words);
	const sorted = sortByFrequency(frequencies);
	const top5 = getTop5(sorted);
	displayTop5(top5);
};

main();
