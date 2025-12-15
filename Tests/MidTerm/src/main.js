import { FileManager } from './fileManager.js';
import { Lexer } from './lexer.js';
import { Parser } from './parser.js';
import { CodeGen } from './codegen.js';

const fm = new FileManager();

const fileName = 'program.txt';
const source = fm.readSourceFile(fileName);

const lexer = new Lexer(source);
const tokens = lexer.tokenize();

const parser = new Parser(tokens);
const ast = parser.parseProgram();

fm.saveAST(fileName, ast);

const codegen = new CodeGen();
const assembly = codegen.generate(ast);

fm.saveAssembly(fileName, assembly);
