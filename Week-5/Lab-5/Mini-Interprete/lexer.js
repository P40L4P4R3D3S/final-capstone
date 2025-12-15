// Function to tokenize input string into tokens
function tokenize(input) {
	const tokens = [];
	let i = 0;

	while (i < input.length) {
		const char = input[i];

		// Handle number tokens
		if (/\d/.test(char)) {
			let num = '';
			while (i < input.length && /\d/.test(input[i])) {
				num += input[i];
				i++;
			}
			tokens.push({ type: 'NUMBER', value: Number(num) });
			continue;
		}

		// Handle operators
		if (char === '+') tokens.push({ type: 'PLUS' });
		else if (char === '-') tokens.push({ type: 'MINUS' });
		else if (char === '*') tokens.push({ type: 'MUL' });
		else if (char === '/') tokens.push({ type: 'DIV' });
		// Handle parentheses
		else if (char === '(') tokens.push({ type: 'LPAREN' });
		else if (char === ')') tokens.push({ type: 'RPAREN' });
		// Skip whitespace
		else if (/\s/.test(char)) {
			i++;
			continue;
		} else {
			// Throw error for unexpected characters
			throw new Error(`Unexpected character: ${char}`);
		}

		i++;
	}

	// Add EOF token and return
	tokens.push({ type: 'EOF' });
	return tokens;
}

module.exports = { tokenize };
