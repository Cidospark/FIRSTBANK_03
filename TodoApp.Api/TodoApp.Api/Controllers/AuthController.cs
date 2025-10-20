using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.Services;
using TodoApp.Infrastructure.Identity;

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


        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody] UserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.RegisterUser(request);
            if (result.StatusCode == 200)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var result = await _authService.Login(request);
            if (result.StatusCode == 200)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
    }
}