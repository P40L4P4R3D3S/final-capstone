// Immutable list of transactions
const transactions2 = [
	{ amount: 120.0, tag: 'food' },
	{ amount: -50.0, tag: 'refund' },
	{ amount: 200.0, tag: 'electronics' },
	{ amount: 40.0, tag: 'test' },
	{ amount: 15.0, tag: 'food' },
	{ amount: 300.0, tag: 'travel' },
];

const EXCLUDED_TAGS2 = ['test', 'demo'];
const TAX_RATE2 = 0.13;

let total = 0;
let count = 0;
let max = 0;

const processedWithTax = [];

// Manual loop to process all steps
for (let i = 0; i < transactions2.length; i++) {
	const tx = transactions2[i];

	// Filter positive
	if (tx.amount <= 0) {
		continue;
	}

	// Exclude some tags
	if (EXCLUDED_TAGS2.includes(tx.tag)) {
		continue;
	}

	// Apply tax
	const amountWithTax = tx.amount * (1 + TAX_RATE2);

	// Save processed transaction (optional, but useful for output)
	processedWithTax.push({
		amount: tx.amount,
		tag: tx.tag,
		amountWithTax: amountWithTax,
	});

	// Update total, count and max
	total += amountWithTax;
	count += 1;
	if (amountWithTax > max) {
		max = amountWithTax;
	}
}

// Calculate average
const average2 = count > 0 ? total / count : 0;

console.log('\nImperative Version');
console.log('Processed transactions with tax:');
for (let i = 0; i < processedWithTax.length; i++) {
	const tx = processedWithTax[i];
	console.log(`${tx.tag}: ${tx.amountWithTax.toFixed(2)}`);
}

console.log('\nSummary:');
console.log(`Total:   ${total.toFixed(2)}`);
console.log(`Average: ${average2.toFixed(2)}`);
console.log(`Max:     ${max.toFixed(2)}`);
