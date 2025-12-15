// Immutable list of transactions
const transactions = Object.freeze([
	{ amount: 120.0, tag: 'food' },
	{ amount: -50.0, tag: 'refund' },
	{ amount: 200.0, tag: 'electronics' },
	{ amount: 40.0, tag: 'test' },
	{ amount: 15.0, tag: 'food' },
	{ amount: 300.0, tag: 'travel' },
]);

const EXCLUDED_TAGS = Object.freeze(['test', 'demo']);

const TAX_RATE = 0.13;

// Keep only positive transactions
const isPositive = (tx) => tx.amount > 0;

// Keep only transactions whose tag is not excluded
const isAllowedTag = (tx) => !EXCLUDED_TAGS.includes(tx.tag);

// Apply tax to the amount and return a NEW object
const applyTax = (tx) => ({
	...tx,
	amountWithTax: tx.amount * (1 + TAX_RATE),
});

// Reducer to accumulate total, count and max
const summaryReducer = (acc, tx) => {
	const value = tx.amountWithTax;
	return {
		total: acc.total + value,
		count: acc.count + 1,
		max: value > acc.max ? value : acc.max,
	};
};

const processedTransactions = transactions
	.filter(isPositive)
	.filter(isAllowedTag)
	.map(applyTax);

const initialSummary = { total: 0, count: 0, max: 0 };

const summary = processedTransactions.reduce(summaryReducer, initialSummary);

const average = summary.count > 0 ? summary.total / summary.count : 0;

console.log('Functional');
console.log('Processed transactions with tax:');
processedTransactions.forEach((tx) =>
	console.log(`${tx.tag}: ${tx.amountWithTax.toFixed(2)}`)
);

console.log('\nSummary:');
console.log(`Total:   ${summary.total.toFixed(2)}`);
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Max:     ${summary.max.toFixed(2)}`);
