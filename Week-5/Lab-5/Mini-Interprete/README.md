# Mini Arithmetic Interpreter – JavaScript

A simple interpreter capable of evaluating arithmetic expressions using **tokenization**, **parsing**, and **AST evaluation**. This project demonstrates the core ideas behind how real interpreters work.

## Features

* Tokenizer (lexer) for numbers, operators, and parentheses
* Recursive-descent parser that builds an Abstract Syntax Tree (AST)
* Interpreter that evaluates the AST respecting operator precedence
* Supports:

  * `+` addition
  * `-` subtraction
  * `*` multiplication
  * `/` division
  * Parentheses `( )`
* Includes a first test using JavaScript `eval()`

## Project Structure

```
project/
│
├── lexer.js        # Tokenizes the input string
├── parser.js       # Builds the AST
├── interpreter.js  # Evaluates the AST
└── main.js         # Entry point for running the interpreter
```

# 📦 Requirements

* **Node.js** (version 19 or higher recommended)

To check your version:

```bash
node -v
```

# How to Run the Interpreter

### 1. Run the program with an arithmetic expression

```bash
node main.js "3 + 5 * 2"
```

### Expected Output

```
   MINI INTERPRETER

➡️ Expression: 3 + 5 * 2

✔ Using eval():
13

✔ Using custom interpreter:
Tokenizing...
[ ...tokens... ]

Parsing...
{ ...AST structure... }

Evaluating...
Result: 13
```

# Examples

Try any of the following:

```bash
node main.js "10 - 4"
node main.js "(3 + 5) * 2"
node main.js "8 / 2 + 3 * 4"
node main.js "3 + 4 * (2 - 1)"
```

# How It Works

### 1. **Lexer (tokenizer)**

The `lexer.js` file converts an input string like:

```
"3 + 5 * 2"
```

into tokens:

```
[
  { type: "NUMBER", value: 3 },
  { type: "PLUS" },
  { type: "NUMBER", value: 5 },
  { type: "MUL" },
  { type: "NUMBER", value: 2 }
]
```

### 2. **Parser**

The parser build an AST that represents the expression structure:

```
      (+)
     /   \
   (3)   (*)
         / \
       (5) (2)
```

### 3. **Interpreter**

`interpreter.js` evaluates the AST and returns the final numeric result.

# 📖 Learning Goals

This project helps me understand key interpreter/compiler concepts:

* Lexical Analysis
* Parsing with operator precedence
* Abstract Syntax Trees (AST)
* Tree evaluation
* Difference between **eval**, an interpreter, and a compiler
