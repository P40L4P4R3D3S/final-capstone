import { TokenType } from './tokenList.js';

export class Lexer {
	constructor(input) {
		this.input = input;
		this.position = 0;
		this.currentChar = input[this.position];
	}

	advance() {
		this.position++;
		this.currentChar =
			this.position < this.input.length ? this.input[this.position] : null;
	}

	skipWhitespace() {
		while (this.currentChar && /\s/.test(this.currentChar)) {
			this.advance();
		}
	}

	match(expected) {
		if (this.input[this.position + 1] === expected) {
			this.advance();
			return true;
		}
		return false;
	}

	identifier() {
		let result = '';
		while (this.currentChar && /[a-zA-Z_]/.test(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}

		if (result === 'var') return { type: TokenType.VAR, value: result };
		if (result === 'while') return { type: TokenType.WHILE, value: result };
		if (result === 'if') return { type: TokenType.IF, value: result };
		if (result === 'else') return { type: TokenType.ELSE, value: result };

		return { type: TokenType.IDENT, value: result };
	}

	number() {
		let result = '';
		while (this.currentChar && /[0-9]/.test(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}
		return { type: TokenType.NUMBER, value: Number(result) };
	}

	getNextToken() {
		while (this.currentChar !== null) {
			// Ignore spaces
			if (/\s/.test(this.currentChar)) {
				this.skipWhitespace();
				continue;
			}

			// Identifiers or keywords
			if (/[a-zA-Z_]/.test(this.currentChar)) {
				return this.identifier();
			}

			// Numbers
			if (/[0-9]/.test(this.currentChar)) {
				return this.number();
			}

			// Operators and symbols
			switch (this.currentChar) {
				case '+':
					this.advance();
					return { type: TokenType.PLUS, value: '+' };
				case '-':
					this.advance();
					return { type: TokenType.MINUS, value: '-' };
				case '*':
					this.advance();
					return { type: TokenType.STAR, value: '*' };
				case ';':
					this.advance();
					return { type: TokenType.SEMI, value: ';' };
				case '(':
					this.advance();
					return { type: TokenType.LPAREN, value: '(' };
				case ')':
					this.advance();
					return { type: TokenType.RPAREN, value: ')' };
				case '{':
					this.advance();
					return { type: TokenType.LBRACE, value: '{' };
				case '}':
					this.advance();
					return { type: TokenType.RBRACE, value: '}' };

				// = or ==
				case '=':
					if (this.match('=')) {
						this.advance();
						return { type: TokenType.EQ, value: '==' };
					}
					this.advance();
					return { type: TokenType.ASSIGN, value: '=' };

				// > or >=
				case '>':
					if (this.match('=')) {
						this.advance();
						return { type: TokenType.GTE, value: '>=' };
					}
					this.advance();
					return { type: TokenType.GT, value: '>' };

				// < or <=
				case '<':
					if (this.match('=')) {
						this.advance();
						return { type: TokenType.LTE, value: '<=' };
					}
					this.advance();
					return { type: TokenType.LT, value: '<' };

				// ! or !=
				case '!':
					if (this.match('=')) {
						this.advance();
						return { type: TokenType.NEQ, value: '!=' };
					}
					throw new Error('Unexpected character !');

				default:
					throw new Error(`Unexpected character: ${this.currentChar}`);
			}
		}

		return { type: TokenType.EOF, value: null };
	}

	tokenize() {
		const tokens = [];
		let token = this.getNextToken();

		while (token.type !== TokenType.EOF) {
			tokens.push(token);
			token = this.getNextToken();
		}

		tokens.push(token); // EOF
		return tokens;
	}
}

