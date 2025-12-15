const { tokenize } = require('./lexer');
const { Parser } = require('./parser');
const { evaluate } = require('./interpreter');

// Evaluate using native JS eval
function simpleEval(expr) {
	console.log('Native JS eval:', eval(expr));
}

// Evaluate using custom interpreter
function customEval(expr) {
	console.log('\nTokenizing...');
	const tokens = tokenize(expr);
	console.log(tokens);

	console.log('\nParsing...');
	const parser = new Parser(tokens);
	const ast = parser.parse();
	console.log(JSON.stringify(ast, null, 2));

	console.log('\nEvaluating using my interpreter:');
	const result = evaluate(ast);
	console.log('Result:', result);
}

// Run if executed directly
if (require.main === module) {
	const expr = process.argv[2];

	if (!expr) {
		console.log('Usage: node main.js "3 + 5 * 2"');
		process.exit(1);
	}

	console.log('   MINI ARITHMETIC INTERPRETER');

	console.log('Expression:', expr);

	console.log('\n✔️ First using eval():');
	simpleEval(expr);

	console.log('\n✔️ Now using myc interpreter:');
	customEval(expr);
}
