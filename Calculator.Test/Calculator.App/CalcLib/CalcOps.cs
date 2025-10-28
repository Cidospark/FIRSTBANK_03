using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calculator.App.CalcLib
{
    public class CalcOps
    {
        public double Add(string? a, string? b)
        {
            if (string.IsNullOrEmpty(a)) throw new NullReferenceException();

            if (string.IsNullOrEmpty(b)) throw new NullReferenceException();

            return Convert.ToDouble(a) + Convert.ToDouble(b);
        }
    }
}