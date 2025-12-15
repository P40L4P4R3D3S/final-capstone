using System;
using System.Collections.Generic;

class Student
{
    public string Name;
    public double Grade1;
    public double Grade2;
    public double Grade3;

    public Student(string name, double grade1, double grade2, double grade3)
    {
        Name = name;
        Grade1 = grade1;
        Grade2 = grade2;
        Grade3 = grade3;
    }

    public double CalculateAverage()
    {
        return (Grade1 + Grade2 + Grade3) / 3;
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Create a list of students
        List<Student> students = new List<Student>()
        {
            new Student("Alice", 85, 90, 88),
            new Student("Bob", 75, 80, 78),
            new Student("Charlie", 92, 88, 95),
            new Student("Diana", 70, 65, 72),
            new Student("Ethan", 88, 91, 85)
        };

        // Variables to find the best student
        double highestAverage = 0;
        string bestStudent = "";

        // Calculate and show the average of each student
        Console.WriteLine("Students Averages");
        foreach (Student s in students)
        {
            double avg = s.CalculateAverage();
            Console.WriteLine($"{s.Name}: {avg:F2}");

            // Check if this is the best student
            if (avg > highestAverage)
            {
                highestAverage = avg;
                bestStudent = s.Name;
            }
        }

        // Show the best student
        Console.WriteLine("\nBest Student");
        Console.WriteLine($"Name: {bestStudent}");
        Console.WriteLine($"Average: {highestAverage:F2}");
    }
}
