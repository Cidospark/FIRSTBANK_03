using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinqDemo.Models;

namespace LinqDemo
{
    public class Projections
    {
        public static void SelectDemo()
        {
            var persons = Person.persons.OfType<Person>();
            var userNameAndAge = persons.Select(p => new
            {
                name = p.Name,
                age = p.Age
            });

            foreach (var user in userNameAndAge)
            {
                Console.WriteLine($"{user.name} - {user.age}");
            }
        }
    }
}