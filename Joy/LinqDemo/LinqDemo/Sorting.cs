using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using LinqDemo.Models;

namespace LinqDemo
{
    // Sorting : OrderBy, ThenBy, OrderByDescending, ThenByDescending, Reverse

    internal static class Sorting
    {
        private static ArrayList people = Person.persons;

        public static void OrderByDemo()
        {
            var sortedByName = people.OfType<Person>().OrderBy(p => p.Age);
            foreach (var person in sortedByName)
            {
                Console.WriteLine($"{person.Name}, Age: {person.Age}");
            }
        }

        public static void OrderByThenbyDemo()
        {
            var sortedByName = people.OfType<Person>()
                                    .OrderBy(p => p.Age)
                                    .ThenBy(p => p.Name);
            foreach (var person in sortedByName)
            {
                Console.WriteLine($"{person.Name}, Age: {person.Age}");
            }
        }

    }
}
