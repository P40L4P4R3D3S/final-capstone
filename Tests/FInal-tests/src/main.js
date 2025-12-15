import { FileManager } from './fileManager.js';
import { Lexer } from './lexer.js';
import { Parser } from './parser.js';
import { Interpreter } from './interpreter.js';

function parseArgs(argv) {
	const options = {
		fileName: 'program.txt',
		printTokens: true,
		printAst: true,
		saveFiles: true,
		maxSteps: 10000,
	};

	for (const arg of argv) {
		if (arg === '--tokens') {
			options.printTokens = true;
			continue;
		}

		if (arg === '--ast') {
			options.printAst = true;
			continue;
		}

		if (arg === '--no-save') {
			options.saveFiles = false;
			continue;
		}

		if (arg.startsWith('--max-steps=')) {
			const value = Number(arg.split('=')[1]);
			if (!Number.isFinite(value) || value <= 0) {
				throw new Error(`Invalid --max-steps value: ${arg}`);
			}
			options.maxSteps = value;
			continue;
		}

		if (!arg.startsWith('--')) {
			options.fileName = arg;
			continue;
		}

		throw new Error(`Unknown argument: ${arg}`);
	}

	return options;
}

function formatTrace(entry) {
	const prefix = `[${String(entry.step).padStart(4, ' ')}]`;

	switch (entry.kind) {
		case 'VarDeclaration':
			return `${prefix} var ${entry.name} = ${entry.expr}  (-> ${
				entry.after
			})  env=${JSON.stringify(entry.env)}`;

		case 'Assignment':
			return `${prefix} ${entry.name} = ${entry.expr}  (${entry.before} -> ${
				entry.after
			})  env=${JSON.stringify(entry.env)}`;

		case 'WhileTest':
			return `${prefix} while (${entry.condition}) => ${entry.result}`;

		case 'IfTest':
			return `${prefix} if (${entry.condition}) => ${entry.result}`;

		default:
			return `${prefix} ${entry.kind}`;
	}
}

function main() {
	const { fileName, printTokens, printAst, saveFiles, maxSteps } = parseArgs(
		process.argv.slice(2)
	);

	const fm = new FileManager();
	const source = fm.readSourceFile(fileName);

	const lexer = new Lexer(source);
	const tokens = lexer.tokenize();
	if (printTokens) console.log(tokens);

	const parser = new Parser(tokens);
	const ast = parser.parseProgram();
	if (printAst) console.log(JSON.stringify(ast, null, 2));

	if (saveFiles) {
		const astPath = fm.saveAST(fileName, ast);
		console.log(`AST saved to: ${astPath}`);
	}

	console.log('\nEXEC TRACE:\n');
	const interpreter = new Interpreter({
		maxSteps,
		onTrace: (entry) => console.log(formatTrace(entry)),
	});

	const result = interpreter.run(ast);

	if (saveFiles) {
		const tracePath = fm.saveTrace(fileName, result.trace);
		console.log(`\nTrace saved to: ${tracePath}`);
	}

	console.log('\nFINAL RESULT:', result.env);
}

main();
