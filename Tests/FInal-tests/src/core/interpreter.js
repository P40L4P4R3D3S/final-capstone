export class Interpreter {
	// constructor the interpreter
	constructor({ maxSteps = 10000, onTrace } = {}) {
		this.maxSteps = maxSteps;
		this.onTrace = onTrace;
		this.env = new Map();
		this.trace = [];
		this.step = 0;
	}

	run(ast) {
		this.env = new Map();
		this.trace = [];
		this.step = 0;

		this.execProgram(ast);

		return {
			env: this.snapshot(),
			trace: this.trace,
		};
	}

	// creates a snapshot of the current environment
	snapshot() {
		return Object.fromEntries(this.env.entries());
	}

	emit(entry) {
		this.step += 1;
		if (this.step > this.maxSteps) {
			throw new Error(
				`Step limit exceeded (${this.maxSteps}). Possible infinite loop.`
			);
		}

		const fullEntry = { step: this.step, ...entry, env: this.snapshot() };
		this.trace.push(fullEntry);
		if (this.onTrace) this.onTrace(fullEntry);
	}

	// executes the program node
	execProgram(node) {
		if (!node || node.type !== 'Program') {
			throw new Error('Interpreter expects a Program node at top-level');
		}

		for (const stmt of node.body) {
			this.execStatement(stmt);
		}
	}

	// executes statements based on type
	execStatement(node) {
		switch (node.type) {
			case 'VarDeclaration': {
				const name = node.name.name;
				const after = this.evalExpr(node.value);
				const before = this.env.has(name) ? this.env.get(name) : null;

				this.env.set(name, after);
				this.emit({
					kind: 'VarDeclaration',
					name,
					before,
					after,
					expr: this.formatExpr(node.value),
				});
				return;
			}

			case 'Assignment': {
				const name = node.name.name;
				if (!this.env.has(name)) {
					throw new Error(`Variable not declared: ${name}`);
				}

				const before = this.env.get(name);
				const after = this.evalExpr(node.value);
				this.env.set(name, after);

				this.emit({
					kind: 'Assignment',
					name,
					before,
					after,
					expr: this.formatExpr(node.value),
				});
				return;
			}

			case 'While': {
				while (true) {
					const result = this.evalBool(node.condition);
					this.emit({
						kind: 'WhileTest',
						condition: this.formatCondition(node.condition),
						result,
					});

					if (!result) break;
					for (const stmt of node.body) {
						this.execStatement(stmt);
					}
				}
				return;
			}

			case 'If': {
				const result = this.evalBool(node.condition);
				this.emit({
					kind: 'IfTest',
					condition: this.formatCondition(node.condition),
					result,
				});

				const branch = result ? node.consequent : node.alternate;
				if (Array.isArray(branch)) {
					for (const stmt of branch) {
						this.execStatement(stmt);
					}
				}
				return;
			}

			default:
				throw new Error(`Unsupported statement type: ${node.type}`);
		}
	}

	// evaluates expressions to values
	evalExpr(node) {
		switch (node.type) {
			case 'NumberLiteral':
				return node.value;

			case 'Identifier': {
				const name = node.name;
				if (!this.env.has(name)) {
					throw new Error(`Variable not declared: ${name}`);
				}
				return this.env.get(name);
			}

			case 'BinaryExpr': {
				const left = this.evalExpr(node.left);
				const right = this.evalExpr(node.right);

				switch (node.operator) {
					case '+':
						return left + right;
					case '-':
						return left - right;
					case '*':
						return left * right;
					default:
						throw new Error(`Unsupported binary operator: ${node.operator}`);
				}
			}

			default:
				throw new Error(`Unsupported expression type: ${node.type}`);
		}
	}

	// evaluates relational expressions to booleans
	evalBool(node) {
		if (node.type !== 'RelationalExpr') {
			throw new Error(`Expected RelationalExpr, got: ${node.type}`);
		}

		const left = this.evalExpr(node.left);
		const right = this.evalExpr(node.right);

		switch (node.operator) {
			case '>':
				return left > right;
			case '<':
				return left < right;
			case '>=':
				return left >= right;
			case '<=':
				return left <= right;
			case '==':
				return left === right;
			case '!=':
				return left !== right;
			default:
				throw new Error(`Unsupported relational operator: ${node.operator}`);
		}
	}

	// formats condition for tracing
	formatCondition(node) {
		if (!node || node.type !== 'RelationalExpr')
			return String(node?.type ?? node);
		return `${this.formatExpr(node.left)} ${node.operator} ${this.formatExpr(
			node.right
		)}`;
	}

	// formats expressions with precedence
	formatExpr(node, parentPrecedence = 0) {
		switch (node.type) {
			case 'NumberLiteral':
				return String(node.value);
			case 'Identifier':
				return node.name;
			case 'BinaryExpr': {
				const precedence = this.exprPrecedence(node);
				const left = this.formatExpr(node.left, precedence);
				const right = this.formatExpr(node.right, precedence + 1);
				const text = `${left} ${node.operator} ${right}`;
				return precedence < parentPrecedence ? `(${text})` : text;
			}
			default:
				return String(node?.type ?? node);
		}
	}

	// gets precedence for operators
	exprPrecedence(node) {
		if (node.type !== 'BinaryExpr') return 99;
		switch (node.operator) {
			case '*':
				return 2;
			case '+':
			case '-':
				return 1;
			default:
				return 0;
		}
	}
}
