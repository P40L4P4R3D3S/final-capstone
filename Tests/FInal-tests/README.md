# Capstone

Interpreter · Python Transpiler · WebAssembly (WAT) Generator

This project implements a complete mini-language toolchain, covering three fundamental stages of language processing:

1. **Interpreter** – Executes the program directly from its AST.
2. **Transpiler to Python** – Converts the AST into equivalent high-level Python code.
3. **Compiler to WebAssembly (WAT)** – Translates the AST into low-level WebAssembly Text Format.

## Language Features

The mini-language supports:

* Integer variables (`var`)
* Arithmetic operations: `+`, `-`, `*`
* Assignments
* Control flow:

  * `if`
  * `while`
* Relational operators:

  * `>`, `<`, `>=`, `<=`, `==`, `!=`

Example input program:

```txt
var x = 4;
var y = 2;
var z = x * y;

while (z > 0) {
  z = z - 1;
}
```

## Project Structure

```
Mini-Language-Capstone/
│
├── origin/        # Input source programs
│   └── program.txt
│
├── src/           # Core implementation
│
├── ast/           # Generated AST (JSON)
│   └── program.json
│
├── trace/         # Interpreter execution trace
│   └── program.trace.json
│
├── dist/          # Generated outputs
│   ├── program.py
│   └── program.wat
│
└── README.md
```

## Part 1 — Interpreter

The interpreter executes the program directly from the AST, maintaining an environment that maps variable names to values. It also records a **step-by-step execution trace**, showing how variables change over time.

### Key Characteristics

* Direct execution
* Mutable environment
* Closely mirrors how a virtual machine works

## Part 2 — Python Transpiler

The Python transpiler does not execute the program. Instead, it transforms the AST into equivalent Python source code.

### Key Characteristics

| Mini-Language   | Python          |
| --------------- | --------------- |
| `var`           | removed         |
| `;`             | removed         |
| `{ ... }`       | indentation     |
| explicit blocks | implicit blocks |

## Part 3 — WebAssembly (WAT) Generator

This stage simulates a **compiler backend** by generating WebAssembly Text Format (WAT). WebAssembly is:

* Low-level
* Stack-based
* Explicit about control flow and locals

## Difficulty Comparison

### Interpreter vs Transpiler vs WebAssembly Compiler

| Stage     | Difficulty | Reason          |
| --------- | ---------- | --------------- |
| **Interpreter**       | ⭐ Easy     | Executes AST directly; logic follows language semantics naturally    |
| **Python Transpiler** | ⭐⭐ Medium  | Requires correct syntax, formatting, and block handling              |
| **WASM Generator**    | ⭐⭐⭐ Hard   | Requires low-level thinking, stack discipline, explicit control flow |

WebAssembly Is Harder because:

* No variables in the traditional sense → locals must be managed
* Stack-based execution model
* Control flow uses `block`, `loop`, `br`, `br_if`
* Conditions must be inverted using `i32.eqz`

## Programming Paradigms Comparison

### Best Paradigm per Stage

| Stage             | Best Paradigm    | Why         |
| ----------------- | ---------------- | --------------------------------------------------- |
| **Interpreter**   | Imperative / OOP | Natural state mutation (variables change over time) |
| **Transpiler**    | Functional       | Pure transformations: AST → text                    |
| **WASM Compiler** | Multiparadigm    | Functional traversal + imperative counters & state  |
| **Build System**  | Declarative      | Describe *what* to build, not *how*                 |

### Paradigm Used in This Project

The implementation is **multiparadigm**, dominated by:

* **Object-Oriented Programming**

  * `Lexer`, `Parser`, `Interpreter`, `PythonTranspiler`, `WasmTranspiler`
* **Imperative style**

  * mutable environment
  * indentation counters
  * label generation
* **Functional ideas**

  * recursive AST traversal
  * node → output mapping

This mirrors **real-world compiler implementations**, which are rarely purely functional or purely imperative.

Here is a **first-person conclusion**, with a **reflective and academic** tone, ideal for oral defense or closing a report:

## Conclusion

In this project, I was able to understand in a practical and clear way the **fundamental differences between interpreting, transcompiling, and compiling a language**, something that in theory may seem similar, but in implementation is completely different. Working with the same mini-language and taking it down these three paths allowed me to see how the approach changes depending on the level of abstraction and the execution model.

When implementing the **interpreter**, the process was the most straightforward and natural. The logic consists of traversing the AST, evaluating expressions, and modifying a variable environment that changes over time. Here, the language is “executed” immediately, which makes it easier to understand its semantics and debug errors. The **Python transpiler** was no longer about executing the program, but rather **translating** it into another high-level language. In this case, the main challenge was to generate correct and readable code, respecting syntax rules such as indentation and the removal of unnecessary elements such as `var` or `;`.

The implementation of the **WebAssembly generator (WAT)** was undoubtedly the most complex part of the project. Unlike the interpreter and the transpiler, here I had to think about a low-level execution model, where things like `while` or a comparison are converted into explicit sequences of instructions (`block`, `loop`, `br_if`, `i32.eqz`). This allowed me to understand why compilation is a more difficult and time-consuming process, since it translates not only the form of the program, but also its internal behavior.

The project allowed me to see how the same idea can be represented at different levels of abstraction, and why modern compilers often use multiple intermediate stages.
