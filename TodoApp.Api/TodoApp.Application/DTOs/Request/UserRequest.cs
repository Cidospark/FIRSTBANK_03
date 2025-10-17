using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.DTOs.Request
{
    public class UserRequest
    {
        [Required(ErrorMessage = "First name is required!")]
        [StringLength(15, MinimumLength = 1, ErrorMessage = "First name must be between 1 - 15 characters")]
        public string FirstName { get; set; } = "";


        [Required(ErrorMessage = "Last name is required!")]
        [StringLength(15, MinimumLength = 1, ErrorMessage = "Last name must be between 1 - 15 characters")]
        public string LastName { get; set; } = "";


        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress]
        // [RegularExpression(@"")]
        public string Email { get; set; } = "";

        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\\w\\d\\s])([^\\s]){8,16}$",ErrorMessage = "requires at least one lowercase letter, one uppercase letter, one number, one special character, and a total length of 8 to 16 characters")]
        public string Password { get; set; }
    }
}