using LinqDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinqDemo
{
    internal class Grouping
    {
        private static List<product> products = GroupList.products;
        private static List<order> orders = GroupList.orders;

        public static void JoinDemo()
        {
            var joinedResult = orders.Join(
                products,
                o => o.productId,
                p => p.productId,
                (o, p) => new
                {
                    orderId = o.id,
                    productName = p.name,
                    productCost = p.cost,
                    quantity = o.qty,
                    total = p.cost * o.qty
                }
            );

            foreach (var record in joinedResult)
            {
                Console.WriteLine($"{record.orderId}, {record.productName}, {record.productCost}, {record.quantity}, {record.total}");
            }
        }

        public static void GroupByDemo()
        {
            var groupedResult = Person.persons
                                     .OfType<Person>()
                                     .GroupBy(p => p.Age);

            foreach (var ageGroup in groupedResult)
            {
                Console.WriteLine($"{ageGroup.Key} - {ageGroup.Count()}");
                foreach (var person in ageGroup)
                {
                    Console.WriteLine($"   {person.Name}");
                }
                Console.WriteLine("------\n");
            }
        }

        public static void GroupJoinDemo()
        {
            var groupJoinedResult = products.GroupJoin(
                orders,
                p => p.productId,
                o => o.productId,
                (p, oGroup) => new
                {
                    productName = p.name,
                    orders = oGroup
                }
            );

            foreach (var record in groupJoinedResult)
            {
                Console.WriteLine($"{record.productName} - {record.orders.Count()}");
                foreach (var order in record.orders)
                {
                    Console.WriteLine($"   Order ID: {order.id}, Quantity: {order.qty}");
                }
                Console.WriteLine("------\n");
            }
        }
    }
}
