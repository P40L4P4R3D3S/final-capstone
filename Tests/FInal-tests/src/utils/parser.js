import { TokenType } from './tokenList.js';

export class Parser {
	constructor(tokens) {
		this.tokens = tokens;
		this.position = 0;
		this.currentToken = tokens[0];
	}

	//move to next token
	advance() {
		this.position++;
		this.currentToken = this.tokens[this.position];
	}

	// check current token type
	match(type) {
		if (this.currentToken.type === type) {
			this.advance();
			return true;
		}
		return false;
	}

	expect(type, message) {
		if (this.currentToken.type === type) {
			this.advance();
		} else {
			throw new Error(message + ` Found: ${this.currentToken.type}`);
		}
	}

	// Entry point
	parseProgram() {
		const body = this.parseStatementList();
		return { type: 'Program', body };
	}

	// { Statement }
	parseStatementList() {
		const statements = [];

		while (
			this.currentToken.type !== TokenType.EOF &&
			this.currentToken.type !== TokenType.RBRACE
		) {
			statements.push(this.parseStatement());
		}

		return statements;
	}

	// Statement
	parseStatement() {
		// var Declaration
		if (this.match(TokenType.VAR)) {
			return this.parseVarDeclaration();
		}

		// while Loop
		if (this.match(TokenType.WHILE)) {
			return this.parseWhileLoop();
		}

		// if conditional
		if (this.match(TokenType.IF)) {
			return this.parseIfStatement();
		}

		// Assignment
		if (this.currentToken.type === TokenType.IDENT) {
			return this.parseAssignment();
		}

		throw new Error(
			`Unexpected statement starting with token: ${this.currentToken.type}`
		);
	}

	// var IDENT = Expr ;
	parseVarDeclaration() {
		const name = this.parseIdentifier();

		this.expect(TokenType.ASSIGN, "Expected '=' in variable declaration");

		const value = this.parseArithExpr();

		this.expect(TokenType.SEMI, "Expected ';' after variable declaration");

		return {
			type: 'VarDeclaration',
			name,
			value,
		};
	}

	// IDENT = Expr ;
	parseAssignment() {
		const name = this.parseIdentifier();

		this.expect(TokenType.ASSIGN, "Expected '=' in assignment");

		const value = this.parseArithExpr();

		this.expect(TokenType.SEMI, "Expected ';' after assignment");

		return {
			type: 'Assignment',
			name,
			value,
		};
	}

	// while (condition) { body }
	parseWhileLoop() {
		this.expect(TokenType.LPAREN, "Expected '(' after 'while'");

		const condition = this.parseBoolExpr();

		this.expect(TokenType.RPAREN, "Expected ')'");
		this.expect(TokenType.LBRACE, "Expected '{' to open loop block");

		const body = this.parseStatementList();

		this.expect(TokenType.RBRACE, "Expected '}' to close loop block");

		return {
			type: 'While',
			condition,
			body,
		};
	}

	// if (condition) { consequent } else { alternate }
	parseIfStatement() {
		this.expect(TokenType.LPAREN, "Expected '(' after 'if'");

		const condition = this.parseBoolExpr();

		this.expect(TokenType.RPAREN, "Expected ')'");
		this.expect(TokenType.LBRACE, "Expected '{' to open if block");

		const consequent = this.parseStatementList();

		this.expect(TokenType.RBRACE, "Expected '}' to close if block");

		let alternate = null;
		if (this.match(TokenType.ELSE)) {
			this.expect(TokenType.LBRACE, "Expected '{' to open else block");

			alternate = this.parseStatementList();

			this.expect(TokenType.RBRACE, "Expected '}' to close else block");
		}

		return {
			type: 'If',
			condition,
			consequent,
			alternate,
		};
	}

	// BoolExpr := ArithExpr RelOp ArithExpr
	parseBoolExpr() {
		const left = this.parseArithExpr();
		const operator = this.parseRelOp();
		const right = this.parseArithExpr();

		return {
			type: 'RelationalExpr',
			operator,
			left,
			right,
		};
	}

	parseRelOp() {
		const token = this.currentToken;

		switch (token.type) {
			case TokenType.GT:
				this.advance();
				return '>';
			case TokenType.LT:
				this.advance();
				return '<';
			case TokenType.GTE:
				this.advance();
				return '>=';
			case TokenType.LTE:
				this.advance();
				return '<=';
			case TokenType.EQ:
				this.advance();
				return '==';
			case TokenType.NEQ:
				this.advance();
				return '!=';
		}

		throw new Error('Expected relational operator');
	}

	parseArithExpr() {
		let node = this.parseTerm();

		while (
			this.currentToken.type === TokenType.PLUS ||
			this.currentToken.type === TokenType.MINUS
		) {
			const operator = this.currentToken.value;
			this.advance();

			const right = this.parseTerm();

			node = {
				type: 'BinaryExpr',
				operator,
				left: node,
				right,
			};
		}

		return node;
	}

	parseTerm() {
		let node = this.parseFactor();

		while (this.currentToken.type === TokenType.STAR) {
			const operator = this.currentToken.value;
			this.advance();

			const right = this.parseFactor();

			node = {
				type: 'BinaryExpr',
				operator,
				left: node,
				right,
			};
		}

		return node;
	}

	parseFactor() {
		const token = this.currentToken;

		if (token.type === TokenType.NUMBER) {
			this.advance();
			return { type: 'NumberLiteral', value: token.value };
		}

		if (token.type === TokenType.IDENT) {
			return this.parseIdentifier();
		}

		if (this.match(TokenType.LPAREN)) {
			const expr = this.parseArithExpr();
			this.expect(TokenType.RPAREN, "Expected ')' after expression");
			return expr;
		}

		throw new Error(`Unexpected token in factor: ${token.type}`);
	}

	parseIdentifier() {
		const token = this.currentToken;
		this.expect(TokenType.IDENT, 'Expected identifier');
		return { type: 'Identifier', name: token.value };
	}
}
