# Activity 1

## 1. Python script

This script uses **Object-Oriented Programming** with a class called `WordFrequencyAnalyzer`.

We use `import re` for the **regular expressions** module, used to remove punctuation from text, the class encapsulates all logic: reading the file, processing the text, and printing the result. This helps to group related behavior and data in one place.

With `__init__` runs to create an object, stores the path to the text file in the instance attribute `self.file_path` and the default file is `"input.txt"` if you do not pass another path.

Opens the file using a `with open(self.file_path, 'r', encoding='utf-8') as file:` to open the file and automatically closes it after reading and `file.read()` returns the complete content as a string.

   * The method uses `try/except` to handle errors:

     * `FileNotFoundError` if the file does not exist.
     * `IOError` for other read problems.
   * Instead of stopping silently, it raises an error with a clear message.

After I put **`process_text`** method which transforms and analyzes the text to convert all characters to **lowercase**, uses a regular expression to remove any character that is **not** a word (`\w`) or whitespace (`\s`), effectively deleting punctuation, splits the string by spaces and newlines into a list of words and starts dictionary every new key with value `0` automatically. For each word, it increases the frequency count by 1, finally sort and print.

---

## 2. JavaScript script

This script uses a **functional style** with many small functions, no classes, and minimal shared state, imports Node.js **file system** module to read files from disk.

readText is a small function that reads a file synchronously and returns the text, it has a parameter `path` to be reusable with different files, then converts text to lowercase, after we use a regular expression to remove punctuation, similar to the Python version and returns a new string.

With tokenize splits the text into a list of words using a regex that matches one or more whitespace characters. Works with spaces, tabs and newlines. Using `filterEmpty` remove any empty strings that might appear after splitting. 

When we use `reduce` to build an object `{ palabra: frecuencia }` means:
   * If `acc[word]` is undefined, use `0`, then add 1.
   * Even though `acc` is technically mutated, the pattern is common in JS functional style, scoped to the reduce process.

 With sortByFrequency return an array of `[word, frequency]`, descending by the frequency value, then takes the first 5 elements of the sorted array and print the solution.

---

## 3. Comparison Table

| Aspect   | Python  | JavaScript  |
| -------- | ------------- | ------------- |
| **Paradigm**    | Object-Oriented Programming (class, methods, instance state)                      | Functional style (small pure functions, composition, `map/filter/reduce`)               |
| **Structure** | One main class with methods (`read_file`, `process_text`, `get_top_words`, `run`) | Many independent functions + one `main` that connects them  |
| **Lines of code**  | 46 | 39 |
| **Readability** | Very readable if you like thinking in “objects that do things”                    | Very readable if you like thinking in “data flowing through transformations”            |
| **Encapsulation**            | Strong: file path and logic are inside the class, easy to extend with new methods | Weak: all functions are global (in the module) and loosely connected                    |
| **Use of language features** | Uses `defaultdict`, `with open`, exceptions, f-strings – idiomatic Python         | Uses `fs`, `Array.reduce`, `Object.entries`, arrow functions – idiomatic Node.js        |
| **Ideal for…**               | Projects where you want clear “objects” representing behaviors and data           | Situations where you prefer data pipelines and transformation steps                     |
