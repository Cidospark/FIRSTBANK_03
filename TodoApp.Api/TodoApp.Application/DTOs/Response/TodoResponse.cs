using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.DTOs.Response
{
    public class TodoResponse
    {
        public string Id { get; set; } = "";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public bool IsCompleted { get; set; } = false;
        public DateTime DueDate { get; set; } = DateTime.UtcNow.AddDays(7);
        public string UserId { get; set; } = "";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}