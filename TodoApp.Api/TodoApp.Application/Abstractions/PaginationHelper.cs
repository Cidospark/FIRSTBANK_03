using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.Abstractions
{
    public static class PaginationHelper
    {
        public static int GetOffset(int page, int size)
        {
            page = page < 1 ? 1 : page;
            size = size < 1 ? 10 : size;
            return (page - 1) * size;
        }
    }
}