export const TokenType = {
	// Keywords
	VAR: 'VAR',
	WHILE: 'WHILE',

	// Identifiers & numbers
	IDENT: 'IDENT',
	NUMBER: 'NUMBER',

	// Operators
	PLUS: 'PLUS', // +
	MINUS: 'MINUS', // -
	STAR: 'STAR', // *
	ASSIGN: 'ASSIGN', // =

	// Relational operators
	GT: 'GT', // >
	LT: 'LT', // <
	GTE: 'GTE', // >=
	LTE: 'LTE', // <=
	EQ: 'EQ', // ==
	NEQ: 'NEQ', // !=

	// Symbols
	LPAREN: 'LPAREN', // (
	RPAREN: 'RPAREN', // )
	LBRACE: 'LBRACE', // {
	RBRACE: 'RBRACE', // }
	SEMI: 'SEMI', // ;

	// End of file
	EOF: 'EOF',
};
