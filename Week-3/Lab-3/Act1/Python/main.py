import re
from collections import defaultdict

class WordFrequencyAnalyzer:

    def __init__(self, file_path='input.txt'):
        self.file_path = file_path

    def read_file(self):
        try:
            with open(self.file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except FileNotFoundError:
            raise FileNotFoundError(f"The file '{self.file_path}' was not found.")
        except IOError as e:
            raise IOError(f"An error occurred while reading the file: {e}")

    def process_text(self, text):
        # Convert to lowercase
        text = text.lower()
        # Remove punctuation
        text = re.sub(r'[^\w\s]', '', text)
        # Split into words
        words = text.split()
        # Count frequencies using a dictionary
        freq_dict = defaultdict(int)
        for word in words:
            freq_dict[word] += 1
        return dict(freq_dict)

    def get_top_words(self, freq_dict, n=5):
        return sorted(freq_dict.items(), key=lambda x: x[1], reverse=True)[:n]

    def run(self):
        try:
            text = self.read_file()
            freq_dict = self.process_text(text)
            top_words = self.get_top_words(freq_dict)
            for word, freq in top_words:
                print(f"Palabra: '{word}' | Frecuencia: {freq}")
        except (FileNotFoundError, IOError) as e:
            print(f"Error: {e}")

if __name__ == '__main__':
    analyzer = WordFrequencyAnalyzer()
    analyzer.run()
