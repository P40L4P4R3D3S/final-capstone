import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileManager {
	constructor({ baseDir = path.resolve(__dirname, '..') } = {}) {
		this.baseDir = baseDir;
		this.originPath = path.join(this.baseDir, 'origin');
		this.astPath = path.join(this.baseDir, 'ast');
		this.tracePath = path.join(this.baseDir, 'trace');
		this.distPath = path.join(this.baseDir, 'dist');

		this.ensureFolder(this.astPath);
		this.ensureFolder(this.tracePath);
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
		fs.writeFileSync(filePath, JSON.stringify(astObject, null, 2), 'utf8');
		return filePath;
	}

	// Save trace interpreter
	saveTrace(fileName, traceObject) {
		const outputName = fileName.replace(/\.[^/.]+$/, '') + '.trace.json';
		const filePath = path.join(this.tracePath, outputName);
		fs.writeFileSync(filePath, JSON.stringify(traceObject, null, 2), 'utf8');
		return filePath;
	}

	// Save transpiled Python code in /dist
	savePython(fileName, pythonCode) {
		const outputName = fileName.replace(/\.[^/.]+$/, '') + '.py';
		const filePath = path.join(this.distPath, outputName);
		fs.writeFileSync(filePath, pythonCode, 'utf8');
		return filePath;
	}

	// Save transpiled WAT code in /dist
	saveWat(fileName, watCode) {
		const outputName = fileName.replace(/\.[^/.]+$/, '') + '.wat';
		const filePath = path.join(this.distPath, outputName);
		fs.writeFileSync(filePath, watCode, 'utf8');
		return filePath;
	}
}
