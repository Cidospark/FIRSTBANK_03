using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.DTOs.Request
{
    public class TodoRequest
    {
        [Required(ErrorMessage = "Title is Required!")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Title characters must be between 2 - 50.")]
        public string Title { get; set; } = "";

        [MaxLength(150, ErrorMessage = "Max length allowed is 150 characters.")]
        public string Description { get; set; } = "";
        
        [Required(ErrorMessage = "User Id is required")]
        public string UserId { get; set; } = "";
    }
}