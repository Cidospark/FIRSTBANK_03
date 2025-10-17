using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinqDemo.Models
{
    internal class GroupList
    {
        public static List<order> orders = new List<order> {
            new order { id = 1, productId = 1, qty = 2 },
            new order { id = 2, productId = 1, qty = 5 },
            new order { id = 3, productId = 84, qty = 5 },
        };
        public static List<product> products = new List<product> {
            new product { productId = 1, name = "Bag", cost = 200 },
            new product { productId = 84, name = "Shoe", cost = 500 }
        };


    }

    public class order
    {
        public int id { get; set; }
        public int productId { get; set; }
        public int qty { get; set; }
    }

    public class product
    {
        public int productId { get; set; }
        public string name { get; set; }
        public int cost { get; set; }
    }
}
