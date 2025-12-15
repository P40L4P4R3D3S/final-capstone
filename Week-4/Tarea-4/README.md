# **README**

This document explains how to compile a C program using **Clang** and how to generate and inspect **LLVM Intermediate Representation (IR)**. It includes step-by-step instructions to compile with different optimization levels, view IR files, generate assembly, and measure binary size and performance.

## **1. Requirements**

Make sure LLVM/Clang is installed:

```bash
sudo apt update
sudo apt install clang llvm -y
```

Check versions:

```bash
clang --version
llvm-as --version
```

## **2. Compile C Code with Different Optimization Levels**

Clang provides several optimization flags:

| Flag  | Description                           |
| ----- | ------------------------------------- |
| `-O0` | No optimization (fastest compilation) |
| `-O1` | Basic optimizations                   |
| `-O2` | Strong optimizations                  |
| `-O3` | Aggressive optimizations              |
| `-Os` | Optimize for size                     |
| `-Oz` | Optimize for smallest size            |

Compile your program (`redundante.c`) using each level:

```bash
clang -O0 redundante.c -o redundante_O0
clang -O1 redundante.c -o redundante_O1
clang -O2 redundante.c -o redundante_O2
clang -O3 redundante.c -o redundante_O3
clang -Os redundante.c -o redundante_Os
clang -Oz redundante.c -o redundante_Oz
```

## **3. Measure Binary Size**

```bash
ls -lh redundante_O*
```

---

## **4. Measure Execution Time**

Run each binary:

```bash
time ./redundante_O0
time ./redundante_O1
time ./redundante_O2
time ./redundante_O3
time ./redundante_Os
time ./redundante_Oz
```

---

## **5. Measure Compilation Time**

```bash
time clang -O0 redundante.c -o redundante_O0
time clang -O3 redundante.c -o redundante_O3
time clang -Oz redundante.c -o redundante_Oz
```
