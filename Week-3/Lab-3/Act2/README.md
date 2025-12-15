# Even Numbers

## Installation

1. Make sure you have Python 3 installed.

2. Navigate to the project directory:

``
cd Week-3/Lab-3/Act1/Python
``

## Execution

Run the program using the following command:

```bash
python main.py
```

## Result

![alt text](image.png)

## **Differences Between the OOP and Functional Approaches**

In the OOP version, the program is centered around a class (`ListaNumeros`) that encapsulates both the data (the list of numbers) and the behavior (methods to get even numbers and calculate the average). The logic is organized inside methods, and an instance of the class is used to access these operations. This approach emphasizes structure, grouping related functionality in a single object.

In contrast, the functional version does not use classes or objects. Instead, it relies on pure functions such as `filter` and `reduce`, which directly transform data without maintaining internal state, the list is simply passed from one function to another, creating a clear flow of transformations and this approach favors simplicity and avoids the need for class design.

## **Advantages and Disadvantages of Each Paradigm**

### **OOP**

**Advantage:** OOP provides clear organization and encapsulation. By placing logic inside methods and keeping the data as an attribute, the structure becomes easy to extend or reuse in larger programs.

**Disadvantage:** For simple tasks, OOP introduces extra boilerplate for creating a class, defining methods, and instantiating an object can be unnecessary overhead.

### **Functional**

**Advantage:** It's concise and direct. Operations like filtering and reducing are performed in a single line, making the code easier to read when the transformation is simple.

**Disadvantage:** It can become harder to follow in more complex applications, especially when many chained transformations are involved. It may also be less intuitive for beginners who expect step-by-step instructions or mutable structures.

## **Reflection: Which Approach Was Easier?**

For this exercise and forever for me, the functional approach feels easier and more natural than OOP, because the problem only requires basic list processing, and the functional tools (`filter`, `lambda`, and `reduce`) allow expressing the solution in a very compact way. There is no need to design a class or structure the logic into multiple methods and the code flows directly from input to output, which makes it faster to write and simpler to understand for a small task like this.
