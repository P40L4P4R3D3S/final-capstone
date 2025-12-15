export class PythonTranspiler {
	constructor({ indent = '    ' } = {}) {
		this.indentText = indent;
		this.indentLevel = 0;
		this.lines = [];
	}

	// main method to generate python code from ast
	generate(ast) {
		this.lines = [];
		this.indentLevel = 0;

		this.genProgram(ast);

		return this.lines.join('\n') + '\n';
	}

	// emits a line with current indentation
	emit(line) {
		this.lines.push(this.indentText.repeat(this.indentLevel) + line);
	}

	// executes a function with increased indentation level
	withIndent(fn) {
		this.indentLevel += 1;
		try {
			fn();
		} finally {
			this.indentLevel -= 1;
		}
	}

	// generates code for the program node
	genProgram(node) {
		if (!node || node.type !== 'Program') {
			throw new Error('PythonTranspiler expects a Program node at top-level');
		}

		if (!Array.isArray(node.body) || node.body.length === 0) {
			this.emit('pass');
			return;
		}

		for (const stmt of node.body) {
			this.genStatement(stmt);
		}
	}

	// generates code for statements
	genStatement(node) {
		switch (node.type) {
			case 'VarDeclaration': {
				const name = node.name.name;
				this.emit(`${name} = ${this.genExpr(node.value)}`);
				return;
			}

			case 'Assignment': {
				const name = node.name.name;
				this.emit(`${name} = ${this.genExpr(node.value)}`);
				return;
			}

			case 'While': {
				this.emit(`while ${this.genCondition(node.condition)}:`);
				this.withIndent(() => this.genBlock(node.body));
				return;
			}

			case 'If': {
				this.emit(`if ${this.genCondition(node.condition)}:`);
				this.withIndent(() => this.genBlock(node.consequent));

				if (node.alternate) {
					this.emit('else:');
					this.withIndent(() => this.genBlock(node.alternate));
				}
				return;
			}

			default:
				throw new Error(`Unsupported statement type: ${node.type}`);
		}
	}

	// generates code for a block of statements
	genBlock(statements) {
		if (!Array.isArray(statements) || statements.length === 0) {
			this.emit('pass');
			return;
		}

		for (const stmt of statements) {
			this.genStatement(stmt);
		}
	}

	// generates code for conditions
	genCondition(node) {
		if (!node || node.type !== 'RelationalExpr') {
			throw new Error(`Expected RelationalExpr, got: ${node?.type ?? node}`);
		}

		const left = this.genExpr(node.left);
		const right = this.genExpr(node.right);
		return `${left} ${node.operator} ${right}`;
	}

	// generates code for expressions with precedence
	genExpr(node, parentPrecedence = 0) {
		switch (node.type) {
			case 'NumberLiteral':
				return String(node.value);

			case 'Identifier':
				return node.name;

			case 'BinaryExpr': {
				const precedence = this.exprPrecedence(node.operator);
				const left = this.genExpr(node.left, precedence);
				const right = this.genExpr(node.right, precedence + 1);
				const text = `${left} ${node.operator} ${right}`;
				return precedence < parentPrecedence ? `(${text})` : text;
			}

			default:
				throw new Error(`Unsupported expression type: ${node.type}`);
		}
	}

	// gets precedence for operators
	exprPrecedence(operator) {
		switch (operator) {
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
