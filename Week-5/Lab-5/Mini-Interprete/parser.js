// Parser class for building AST from tokens
class Parser {
	constructor(tokens) {
		this.tokens = tokens;
		this.current = 0;
	}

	// Parse the expression
	parse() {
		return this.expression();
	}

	// Parse addition and subtraction
	expression() {
		let node = this.term();

		while (this.match('PLUS') || this.match('MINUS')) {
			const operator = this.previous().type;
			const right = this.term();
			node = { type: 'BinaryExpr', operator, left: node, right };
		}

		return node;
	}

	// Parse multiplication and division
	term() {
		let node = this.factor();

		while (this.match('MUL') || this.match('DIV')) {
			const operator = this.previous().type;
			const right = this.factor();
			node = { type: 'BinaryExpr', operator, left: node, right };
		}

		return node;
	}

	// Parse numbers and parentheses
	factor() {
		if (this.match('NUMBER')) {
			return { type: 'NumberLiteral', value: this.previous().value };
		}

		if (this.match('LPAREN')) {
			const expr = this.expression();
			this.consume('RPAREN', 'Expected )');
			return expr;
		}

		throw new Error('Unexpected token in factor');
	}

	// Check if current token matches type and advance
	match(type) {
		if (this.check(type)) {
			this.advance();
			return true;
		}
		return false;
	}

	// Consume token or throw error
	consume(type, msg) {
		if (this.check(type)) return this.advance();
		throw new Error(msg);
	}

	// Check if current token matches type
	check(type) {
		if (this.isAtEnd()) return false;
		return this.peek().type === type;
	}

	// Advance to next token
	advance() {
		if (!this.isAtEnd()) this.current++;
		return this.previous();
	}

	// Get current token
	peek() {
		return this.tokens[this.current];
	}

	// Get previous token
	previous() {
		return this.tokens[this.current - 1];
	}

	// Check if at end of tokens
	isAtEnd() {
		return this.peek().type === 'EOF';
	}
}

module.exports = { Parser };
