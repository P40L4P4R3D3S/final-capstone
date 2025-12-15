# **Assembly Transpiler**

A small compiler written in JavaScript that reads a simple custom mini-language, parses it, generates an AST, and transpiles it into compatible with the [Schweigi Assembler Simulator](https://schweigi.github.io/assembler-simulator/)

✔ Lexer (tokenizer)
✔ Parser
✔ AST generation
✔ Code generator
✔ Support for `while` loops with safe exit
✔ File manager to read from `origin/` and save output to `ast/` and `dist/`

## **Project Structure**

```
project/
├── origin/        ← Input source code (.txt)
├── ast/           ← Generated AST (JSON)
├── dist/          ← Generated assembly (.asm)
└── src/
    ├── lexer.js
    ├── parser.js
    ├── codegen.js
    ├── fileManager.js
    ├── main.js
    └── tokenList.js
```

## **How to Run the Project**

### **1. Install dependencies**

```bash
npm install
```

> Only Node.js is required. No external compilers are needed.

### **2. Add a source program**

Place your source code inside:

```
origin/program.txt
```

Example program:

```txt
var a = 3;
var b = 5;
var c = a + b;

while (c > 0) {
  c = c - 1;
}
```

### **3. Run the transpiler**

```bash
npm run start
```

This will:

* Read `origin/program.txt`
* Tokenize it
* Parse it into an AST
* Generate assembly code
* Save outputs automatically

## **Output Files**

### **AST (JSON)**

Saved to:

```
ast/program.json
```

### **Assembly (8-bit CPU)**

Saved to:

```
dist/program.asm
```

You can copy this assembly code directly into the online simulator:

🔗 **[https://schweigi.github.io/assembler-simulator/](https://schweigi.github.io/assembler-simulator/)**

## **Language Features Supported**

### ✔ Integer variables

```
var x = 10;
```

### ✔ Assignments

```
x = x + 3;
```

### ✔ Arithmetic

`+` `-` `*`
with automatic protection against **underflow** (`0 - 1` will NOT become 255).

### ✔ Relational operators

`>` `<` `>=` `<=` `==` `!=`

### ✔ While loops

```
while (x > 0) {
  x = x - 1;
}
```

## 🧑‍💻 Author

Paola Paredes

## Bibliografy for codegen

[instruction set](https://schweigi.github.io/assembler-simulator/instruction-set.html)
