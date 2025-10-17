using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagmeentSystem.Application.DTOs.Request
{
    public class ResetPasswordRequest
    {
        public string Email { get; set; } = "";
        public string AccessToken { get; set; } = "";
    }
}