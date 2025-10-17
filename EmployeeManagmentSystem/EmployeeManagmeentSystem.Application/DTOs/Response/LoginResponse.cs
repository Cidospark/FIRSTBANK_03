using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EmployeeManagmentSystem.Domain.Entities;

namespace EmployeeManagmeentSystem.Application.DTOs.Response
{
    public class LoginResponse
    {
        public string AccessToken { get; set; } = "";
        public List<string> Roles { get; set; } = [];
        public Dictionary<string, bool> Claims { get; set; } = [];
        public EmployeeResponse? EmployeeInfo { get; set; }
    }
}