using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using LinqDemo.Models;

namespace LinqDemo
{
    // Filtering : Where, OfType

    public class Filtering
    {
        private static ArrayList people = Person.persons ;


        public static void WhereDemo()
        {
            var adults = people.OfType<Person>().Where(p => p.Age >= 30);
            foreach (var person in adults)
            {
                Console.WriteLine($"{person.Name}, Age: {person.Age}");
            }
        }

        public static void OfTypeDemo()
        {
            var strings = people.OfType<string>();
            foreach (var str in strings)
            {
                Console.WriteLine(str);
            }
        }

    }
}