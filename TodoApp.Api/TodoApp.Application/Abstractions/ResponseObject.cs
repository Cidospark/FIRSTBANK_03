using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.Abstractions
{
    public class ResponseObject<T>
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = "";
        public List<string> Errors { get; set; } = [];
        public T? Data { get; set; }
    }
}