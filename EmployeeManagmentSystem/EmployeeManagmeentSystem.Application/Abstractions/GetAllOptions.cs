using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmeentSystem.Application.Abstractions
{
    public class GetAllOptions
    {
        public int Page { get; set; }
        public int Size { get; set; }
    }
}