// Evaluate AST node
function evaluate(node) {
	// Handle different node types
	switch (node.type) {
		case 'NumberLiteral':
			// Return number value
			return node.value;

		case 'BinaryExpr': {
			// Evaluate binary expression
			const left = evaluate(node.left);
			const right = evaluate(node.right);

			// Perform operation based on operator
			switch (node.operator) {
				case 'PLUS':
					return left + right;
				case 'MINUS':
					return left - right;
				case 'MUL':
					return left * right;
				case 'DIV':
					return left / right;
			}
		}
	}

	throw new Error('Unknown AST node');
}

module.exports = { evaluate };
