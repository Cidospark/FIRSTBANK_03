using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoApp.Application.Services;
using TodoApp.Domain.Entities;

namespace TodoApp.Api.Controllers
{
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] TodoApp.Application.DTOs.Request.LoginRequest request)
        {
            if(request.Email == "user@example.com" && request.Password == "password123")
            {
                return Ok(await _authService.GenerateAccessToken(new User(){Email = "user@example.com"}, new List<string> { }, new List<Claim> {}));
            };
            return BadRequest();
        }
    }
}