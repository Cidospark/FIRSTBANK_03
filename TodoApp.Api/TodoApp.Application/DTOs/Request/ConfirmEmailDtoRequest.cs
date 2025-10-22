using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Application.DTOs.Request
{
    public class ConfirmEmailDtoRequest
    {
        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "OTP is required!")]
        public string OTPToken { get; set; } = "";
    }
}