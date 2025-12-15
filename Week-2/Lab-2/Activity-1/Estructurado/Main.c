#include <stdio.h>

#define STUDENTS 5
#define SUBJECTS 3

float calculateAverage(float grades[]) {
    float sum = 0;
    for (int i = 0; i < SUBJECTS; i++) {
        sum += grades[i];
    }
    return sum / SUBJECTS;
}

int main() {
    // Predefined names
    char names[STUDENTS][50] = {
        "Alice", "Bob", "Charlie", "Diana", "Ethan"
    };

    // Predefined grades
    float grades[STUDENTS][SUBJECTS] = {
        {85, 90, 88},
        {70, 75, 72},
        {95, 93, 97},
        {80, 82, 85},
        {60, 65, 63}
    };

    float averages[STUDENTS];
    int bestIndex = 0;

    // Calculate averages
    for (int i = 0; i < STUDENTS; i++) {
        averages[i] = calculateAverage(grades[i]);
    }

    // Find best student
    for (int i = 1; i < STUDENTS; i++) {
        if (averages[i] > averages[bestIndex]) {
            bestIndex = i;
        }
    }

    // Show all averages
    printf("--- Averages ---\n");
    for (int i = 0; i < STUDENTS; i++) {
        printf("%s: %.2f\n", names[i], averages[i]);
    }

    // Show best student
    printf("\nBest student: %s with an average of %.2f\n",
           names[bestIndex], averages[bestIndex]);

    return 0;
}
