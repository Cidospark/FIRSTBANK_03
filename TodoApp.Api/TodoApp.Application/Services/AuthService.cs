using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<string> GenerateAccessToken(User user, List<string> roles, List<Claim> claims)
        {
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"] ?? "");

            var userClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("UserName",user.Email ?? ""),
                new Claim(ClaimTypes.Email,user.Email ?? ""),
            };

            foreach (var item in claims)
            {
                claims.Add(new Claim(item.Type, item.Value));
            }

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["JWT:LifeSpan"])),
                // Issuer = configuration["JWT:ValidIssuer"],
                // Audience = configuration["JWT:ValidAudience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);    
            var jwt =  jwtSecurityTokenHandler.WriteToken(token);
            return await Task.FromResult(jwt);
        }

        public Task<LoginResponse> Login(LoginRequest request)
        {
            throw new NotImplementedException();
        }
    }
}