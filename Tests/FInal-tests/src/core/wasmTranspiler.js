// Class responsible for transpiling an Abstract Syntax Tree (AST) into WebAssembly text format
export class WasmTranspiler {
	// Constructor initializes the transpiler with configuration options
	constructor({
		indent = '  ',
		functionName = '_start',
		exportName = '_start',
		includeStart = true,
		includeExport = true,
	} = {}) {
		this.indentText = indent;
		this.functionLabel = `$${functionName}`;
		this.exportName = exportName;
		this.includeStart = includeStart;
		this.includeExport = includeExport;

		this.indentLevel = 0;
		this.lines = [];
		this.labelCounter = 0;
		this.declared = new Set();
	}

	// Main method to generate WebAssembly text format from the AST
	generate(ast) {
		this.lines = [];
		this.indentLevel = 0;
		this.labelCounter = 0;
		this.declared = this.collectDeclaredVariables(ast);

		this.emit('(module');
		this.withIndent(() => {
			this.emit(`(func ${this.functionLabel}`);
			this.withIndent(() => {
				// Declare local variables
				for (const name of this.declared) {
					this.emit(`(local $${name} i32)`);
				}

				// Generate code for each statement in the AST body
				for (const stmt of ast.body ?? []) {
					this.genStatement(stmt);
				}
			});
			this.emit(')');
		});
		this.emit(')');

		return this.lines.join('\n') + '\n';
	}

	// Emits a line with current indentation
	emit(line) {
		this.lines.push(this.indentText.repeat(this.indentLevel) + line);
	}

	// Executes a function with increased indentation level
	withIndent(fn) {
		this.indentLevel += 1;
		try {
			fn();
		} finally {
			this.indentLevel -= 1;
		}
	}

	// Generates a unique label with the given prefix
	newLabel(prefix) {
		this.labelCounter += 1;
		return `$${prefix}_${this.labelCounter}`;
	}

	// Traverses the AST to collect all declared variable names
	collectDeclaredVariables(node) {
		const names = new Set();

		const visit = (n) => {
			if (!n || typeof n !== 'object') return;

			switch (n.type) {
				case 'Program':
					for (const stmt of n.body ?? []) visit(stmt);
					return;

				case 'VarDeclaration':
					if (n.name?.type === 'Identifier') names.add(n.name.name);
					visit(n.value);
					return;

				case 'Assignment':
					visit(n.value);
					return;

				case 'While':
					visit(n.condition);
					for (const stmt of n.body ?? []) visit(stmt);
					return;

				case 'If':
					visit(n.condition);
					for (const stmt of n.consequent ?? []) visit(stmt);
					for (const stmt of n.alternate ?? []) visit(stmt);
					return;

				case 'RelationalExpr':
					visit(n.left);
					visit(n.right);
					return;

				case 'BinaryExpr':
					visit(n.left);
					visit(n.right);
					return;

				default:
					return;
			}
		};

		visit(node);
		return names;
	}

	// Generates wasm code for different statement types
	genStatement(node) {
		switch (node.type) {
			case 'VarDeclaration': {
				const name = node.name.name;
				this.genExpr(node.value);
				this.emit(`local.set $${name}`);
				return;
			}

			case 'Assignment': {
				const name = node.name.name;
				if (!this.declared.has(name)) {
					throw new Error(`Variable not declared: ${name}`);
				}
				this.genExpr(node.value);
				this.emit(`local.set $${name}`);
				return;
			}

			case 'While': {
				const exitLabel = this.newLabel('exit');
				const loopLabel = this.newLabel('loop');

				this.emit(`(block ${exitLabel}`);
				this.withIndent(() => {
					this.emit(`(loop ${loopLabel}`);
					this.withIndent(() => {
						this.genCondition(node.condition);
						this.emit('i32.eqz');
						this.emit(`br_if ${exitLabel}`);

						for (const stmt of node.body ?? []) {
							this.genStatement(stmt);
						}

						this.emit(`br ${loopLabel}`);
					});
					this.emit(')');
				});
				this.emit(')');
				return;
			}

			case 'If': {
				this.genCondition(node.condition);
				this.emit('(if');
				this.withIndent(() => {
					this.emit('(then');
					this.withIndent(() => {
						for (const stmt of node.consequent ?? []) {
							this.genStatement(stmt);
						}
					});
					this.emit(')');

					if (node.alternate) {
						this.emit('(else');
						this.withIndent(() => {
							for (const stmt of node.alternate ?? []) {
								this.genStatement(stmt);
							}
						});
						this.emit(')');
					}
				});
				this.emit(')');
				return;
			}

			default:
				throw new Error(`Unsupported statement type: ${node.type}`);
		}
	}

	// Generates wasm code for relational conditions
	genCondition(node) {
		if (!node || node.type !== 'RelationalExpr') {
			throw new Error(`Expected RelationalExpr, got: ${node?.type ?? node}`);
		}

		this.genExpr(node.left);
		this.genExpr(node.right);

		switch (node.operator) {
			case '>':
				this.emit('i32.gt_s');
				return;
			case '<':
				this.emit('i32.lt_s');
				return;
			case '>=':
				this.emit('i32.ge_s');
				return;
			case '<=':
				this.emit('i32.le_s');
				return;
			case '==':
				this.emit('i32.eq');
				return;
			case '!=':
				this.emit('i32.ne');
				return;
			default:
				throw new Error(`Unsupported relational operator: ${node.operator}`);
		}
	}

	// Generates wasm code for expressions
	genExpr(node) {
		switch (node.type) {
			case 'NumberLiteral':
				this.emit(`i32.const ${node.value}`);
				return;

			case 'Identifier': {
				const name = node.name;
				if (!this.declared.has(name)) {
					throw new Error(`Variable not declared: ${name}`);
				}
				this.emit(`local.get $${name}`);
				return;
			}

			case 'BinaryExpr':
				this.genExpr(node.left);
				this.genExpr(node.right);
				switch (node.operator) {
					case '+':
						this.emit('i32.add');
						return;
					case '-':
						this.emit('i32.sub');
						return;
					case '*':
						this.emit('i32.mul');
						return;
					default:
						throw new Error(`Unsupported binary operator: ${node.operator}`);
				}

			default:
				throw new Error(`Unsupported expression type: ${node.type}`);
		}
	}
}
