export class CodeGen {
	constructor() {
		this.lines = [];
		this.variables = new Set();
		this.labelCounter = 0;
	}

	newLabel(prefix) {
		this.labelCounter += 1;
		return `${prefix}_${this.labelCounter}`;
	}

	emit(line) {
		this.lines.push(line);
	}

	varLabel(name) {
		return `var_${name}`;
	}

	generate(ast) {
		// get variables names
		this.collectVariables(ast);

		// jump over data to start label
		this.emit('JMP start');

		// Variable definitions with 0
		for (const name of this.variables) {
			this.emit(`${this.varLabel(name)}: DB 0`);
		}

		// Start of code
		this.emit('');
		this.emit('start:');

		this.genProgram(ast);

		// Ensure program stops
		this.emit('HLT');

		// Return final assembly string
		return this.lines.join('\n');
	}

	collectVariables(node) {
		const visit = (n) => {
			if (!n || typeof n !== 'object') return;

			switch (n.type) {
				case 'Program':
					n.body.forEach(visit);
					break;

				case 'VarDeclaration':
					if (n.name && n.name.name) {
						this.variables.add(n.name.name);
					}
					visit(n.value);
					break;

				case 'Assignment':
					if (n.name && n.name.name) {
						this.variables.add(n.name.name);
					}
					visit(n.value);
					break;

				case 'While':
					visit(n.condition);
					n.body.forEach(visit);
					break;

				case 'RelationalExpr':
					visit(n.left);
					visit(n.right);
					break;

				case 'BinaryExpr':
					visit(n.left);
					visit(n.right);
					break;

				default:
					break;
			}
		};

		visit(node);
	}

	genProgram(node) {
		if (node.type !== 'Program') {
			throw new Error('CodeGen expects a Program node at top-level');
		}

		for (const stmt of node.body) {
			this.genStatement(stmt);
		}
	}

	genStatement(node) {
		switch (node.type) {
			case 'VarDeclaration':
				this.genVarDeclaration(node);
				break;
			case 'Assignment':
				if (this.isSaturatingDecrement(node)) {
					this.genSaturatingDecrement(node.name.name);
				} else {
					this.genAssignment(node);
				}
				break;
			case 'While':
				this.genWhile(node);
				break;
			default:
				throw new Error(`Unsupported statement type: ${node.type}`);
		}
	}

	genVarDeclaration(node) {
		const name = node.name.name;
		this.genExpression(node.value);
		this.emit(`MOV [${this.varLabel(name)}], A`);
	}

	genAssignment(node) {
		const name = node.name.name;
		this.genExpression(node.value);
		this.emit(`MOV [${this.varLabel(name)}], A`);
	}

	//  x = x - 1;
	isSaturatingDecrement(node) {
		if (node.type !== 'Assignment') return false;
		const name = node.name?.name;
		const value = node.value;
		if (!name || !value || value.type !== 'BinaryExpr') return false;

		if (value.operator !== '-') return false;

		const left = value.left;
		const right = value.right;

		return (
			left.type === 'Identifier' &&
			left.name === name &&
			right.type === 'NumberLiteral' &&
			right.value === 1
		);
	}

	genSaturatingDecrement(varName) {
		const labelDone = this.newLabel(`dec_done_${varName}`);

		this.emit(
			`; Saturated decrement for ${varName}: if (${varName} > 0) ${varName}--`
		);
		this.emit(`MOV A, [${this.varLabel(varName)}]`);
		this.emit('CMP A, 0');
		this.emit(`JE ${labelDone}`);
		this.emit('DEC A');
		this.emit(`MOV [${this.varLabel(varName)}], A`);
		this.emit(`${labelDone}:`);
	}

	// while (condition) { body }
	genWhile(node) {
		const startLabel = this.newLabel('while_start');
		const endLabel = this.newLabel('while_end');

		this.emit(`${startLabel}:`);

		// Generate condition check
		this.genBoolExpr(node.condition, endLabel);

		// Body
		for (const stmt of node.body) {
			this.genStatement(stmt);
		}

		// Jump back to start
		this.emit(`JMP ${startLabel}`);
		this.emit(`${endLabel}:`);
	}

	// BoolExpr := RelationalExpr
	genBoolExpr(node, endLabel) {
		if (node.type !== 'RelationalExpr') {
			throw new Error('Expected RelationalExpr in while condition');
		}

		// Evaluate left into A, copy to B
		this.genExpression(node.left);
		this.emit('MOV B, A'); // B = left

		// Evaluate right into A
		this.genExpression(node.right); // A = right

		// Compare: CMP B, A   (left vs right)
		this.emit('CMP B, A');

		const op = node.operator;

		// Using unsigned comparison mapping

		switch (op) {
			case '>':
				this.emit(`JBE ${endLabel}`);
				break;
			case '<':
				this.emit(`JAE ${endLabel}`);
				break;
			case '>=':
				this.emit(`JB ${endLabel}`);
				break;
			case '<=':
				this.emit(`JA ${endLabel}`);
				break;
			case '==':
				this.emit(`JNE ${endLabel}`);
				break;
			case '!=':
				this.emit(`JE ${endLabel}`);
				break;
			default:
				throw new Error(`Unsupported relational operator: ${op}`);
		}
	}

	genExpression(node) {
		switch (node.type) {
			case 'NumberLiteral':
				this.emit(`MOV A, ${node.value}`);
				break;

			case 'Identifier':
				this.emit(`MOV A, [${this.varLabel(node.name)}]`);
				break;

			case 'BinaryExpr':
				this.genBinaryExpr(node);
				break;

			default:
				throw new Error(`Unsupported expression type: ${node.type}`);
		}
	}

	genBinaryExpr(node) {
		const op = node.operator;

		if (op === '+' || op === '-' || op === '*') {
			if (op === '+') {
				// A = left + right
				this.genExpression(node.left); // A = left
				this.emit('PUSH A'); // push left
				this.genExpression(node.right); // A = right
				this.emit('POP B'); // B = left, A = right
				this.emit('ADD A, B'); // A = right + left
			} else if (op === '-') {
				// A = left - right
				this.genExpression(node.left); // A = left
				this.emit('PUSH A');
				this.genExpression(node.right); // A = right
				this.emit('POP B'); // B = left, A = right
				this.emit('MOV C, B'); // C = left
				this.emit('SUB C, A'); // C = left - right
				this.emit('MOV A, C'); // A = result
			} else if (op === '*') {
				// A = left * right using MUL
				this.genExpression(node.left); // A = left
				this.emit('PUSH A');
				// Evaluate right into A
				this.genExpression(node.right); // A = right
				this.emit('POP B'); // B = left, A = right
				// Move right into C, left into A, then MUL C
				this.emit('MOV C, A'); // C = right
				this.emit('MOV A, B'); // A = left
				this.emit('MUL C'); // A = left * right
			}
		} else {
			throw new Error(`Unsupported binary operator: ${op}`);
		}
	}
}
