using System.Collections;

namespace LinqDemo.Models
{
    internal class Person
    {

        public static ArrayList persons = new ArrayList()
        {
            new Person { Id = 1, Name = "Alice", Age = 30 },
            new Person { Id = 2, Name = "Bob", Age = 25 },
            new Person { Id = 3, Name = "Anthony", Age = 25 },
            "Not a person",
            null,
            new Person { Id = 4, Name = "Charlie", Age = 35 },
            42
        };

        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
}