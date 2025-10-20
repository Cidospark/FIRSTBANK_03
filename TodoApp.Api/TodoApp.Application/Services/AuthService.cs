using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Application.Repositories;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AuthService(IConfiguration configuration, IMapper mapper,
        IUserRepository userRepository)
        {
            _configuration = configuration;
            _userRepository = userRepository;
            _mapper = mapper;
        }
        private async Task<string> GenerateAccessToken(User user, List<string> roles, List<Claim> claims)
        {
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"] ?? "");

            var userClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("UserName", user.Email ?? ""),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
            };

            foreach (var item in claims)
            {
                userClaims.Add(new Claim(item.Type, item.Value));
            }

            foreach(var role in roles)
            {
                userClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(userClaims),
                Expires = DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["JWT:LifeSpan"])),
                // Issuer = configuration["JWT:ValidIssuer"],
                // Audience = configuration["JWT:ValidAudience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);    
            var jwt =  jwtSecurityTokenHandler.WriteToken(token);
            return await Task.FromResult(jwt);
        }

        public async Task<ResponseObject<LoginResponse>> Login(LoginRequest request)
        {
            var user = await _userRepository.GetUseryEmail(request.Email);
            if (user != null)
            {
                if(user.Password == request.Password)
                {
                    var roles = new List<string> { "user", "admin" };
                    var claims = new List<Claim> { };
                    return new ResponseObject<LoginResponse>
                    {
                        StatusCode = 200,
                        Message = "Login is successful",
                        Data = new LoginResponse
                        {
                            AccessToken = await GenerateAccessToken(user, roles, claims),
                            User = _mapper.Map<UserResponse>(user),
                            Roles = roles
                        }
                    };
                }
            }
            

            return new ResponseObject<LoginResponse>
            {
                StatusCode = 400,
                Message = "Login failed",
                Errors = new List<string> { "Invalid credentials" }
            };

        }
    }
}