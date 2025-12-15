import fs from 'fs';
import path from 'path';

export class FileManager {
	constructor() {
		this.originPath = path.resolve('origin');
		this.astPath = path.resolve('ast');
		this.distPath = path.resolve('dist');

		this.ensureFolder(this.astPath);
		this.ensureFolder(this.distPath);
	}

	// Create folder if missing
	ensureFolder(folderPath) {
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
		}
	}

	// Read a file from /origin
	readSourceFile(fileName) {
		const filePath = path.join(this.originPath, fileName);

		if (!fs.existsSync(filePath)) {
			throw new Error(`Source file not found: ${filePath}`);
		}

		return fs.readFileSync(filePath, 'utf8');
	}

	// Save AST as JSON in /ast
	saveAST(fileName, astObject) {
		const outputName = fileName.replace(/\.[^/.]+$/, '') + '.json';
		const filePath = path.join(this.astPath, outputName);

		const json = JSON.stringify(astObject, null, 2);
		fs.writeFileSync(filePath, json, 'utf8');

		console.log(`AST saved to: ${filePath}`);
	}

	// Save assembly code in /dist
	saveAssembly(fileName, assemblyCode) {
		const outputName = fileName.replace(/\.[^/.]+$/, '') + '.asm';
		const filePath = path.join(this.distPath, outputName);

		fs.writeFileSync(filePath, assemblyCode, 'utf8');

		console.log(`Assembly saved to: ${filePath}`);
	}
}
