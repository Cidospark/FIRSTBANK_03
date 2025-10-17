using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqDemo.Models;

namespace LinqDemo
{
    public class Elements
    {
        public static void FirstOrDefaultDemo(int id)
        {
            var persons = Person.persons.OfType<Person>();
            var person = persons.FirstOrDefault(p => p.Id == id);
            if (person != null)
            {
                Console.WriteLine($"{person.Name} - {person.Age}");
            }
            else
            {
                Console.WriteLine("Person not found");
            }
        }
    }
}