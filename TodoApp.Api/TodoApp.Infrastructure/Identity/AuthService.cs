using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Application.Abstractions;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Application.Repositories;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Identity
{
    // SignInManager
    // UserManager
    // RoleManager
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AuthService(IConfiguration configuration,
                            IMapper mapper,
                            UserManager<ApplicationUser> userManager,
                            IUserRepository userRepository)
        {
            _configuration = configuration;
            _mapper = mapper;
            _userManager = userManager;
            _userRepository = userRepository;
        }
        private async Task<string> GenerateAccessTokenAsync(User user, List<string> roles, List<Claim> claims)
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
            // fetch user by email
            var appUser = await _userManager.FindByEmailAsync(request.Email);
            var user = await _userRepository.GetSingleUserAsync(appUser.UserId);

            // check if email is confirmed
            if (!await _userManager.IsEmailConfirmedAsync(appUser))
            {
                return new ResponseObject<LoginResponse>
                {
                    StatusCode = 400,
                    Message = "Email confirmation error!",
                    Errors = new List<string>
                    {
                        "Email not confirmed yet!"
                    }
                };
            }

            // if user is found using email
            if (appUser != null)
            {
                // check if password match
                if (await _userManager.CheckPasswordAsync(appUser, request.Password))
                {
                    var roles = (await _userManager.GetRolesAsync(appUser)).ToList();
                    var claims = (await _userManager.GetClaimsAsync(appUser)).ToList();
                    var newUser = new User
                    {
                        Id = appUser.Id,
                        Email = appUser.Email
                    };

                    // return login response on success
                    return new ResponseObject<LoginResponse>
                    {
                        StatusCode = 200,
                        Message = "Login is successful",
                        Data = new LoginResponse
                        {
                            AccessToken = await GenerateAccessTokenAsync(newUser, roles, claims),
                            User = new UserResponse
                            {
                                Id = user.Id,
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                Email = user.Email
                            },
                            Roles = roles,
                            Claims = claims.ToDictionary(t => t.Type, v => v.Value)
                        }
                    };
                }
            }

            // return errors on failure
            return new ResponseObject<LoginResponse>
            {
                StatusCode = 400,
                Message = "Login failed",
                Errors = new List<string> { "Invalid credentials" }
            };

        }
    
        public async Task<ResponseObject<UserResponse>> RegisterUser(UserRequest request)
        {
            // validate info to register user

            // check if user already exists with email as email
            if (await _userManager.FindByEmailAsync(request.Email) != null)
            {
                return new ResponseObject<UserResponse>
                {
                    StatusCode = 400,
                    Message = "User registration failed",
                    Errors = new List<string> { "Email already exists!" }
                };
            }

            // check if user already exists with email as username
            if (await _userManager.FindByNameAsync(request.Email) != null)
            {
                return new ResponseObject<UserResponse>
                {
                    StatusCode = 400,
                    Message = "User registration failed",
                    Errors = new List<string> { "Username already exists!" }
                };
            }

            // construct new user for both identiy user table and user table
            var newUser = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
            };
            var userToAdd = new ApplicationUser
            {
                UserId = newUser.Id,
                Email = newUser.Email,
                UserName = newUser.Email,
                User = newUser
            };

            // create user
            var addUserResult = await _userManager.CreateAsync(userToAdd, request.Password);
            if (addUserResult.Succeeded)
            {
                // add role of 'user' to the newly created applicationUser on successful registration
                await _userManager.AddToRoleAsync(userToAdd, "user");

                return new ResponseObject<UserResponse>
                {
                    StatusCode = 200,
                    Message = "New user registered!",
                    Data = new UserResponse
                    {
                        Id = newUser.Id,
                        FirstName = newUser.FirstName,
                        LastName = newUser.LastName,
                        Email = newUser.Email
                    }
                };
            }

            // extract errors from result if create user failed
            var errors = addUserResult.Errors.Select(x => x.Description).ToList();

            return new ResponseObject<UserResponse>
            {
                StatusCode = 400,
                Message = "User registration failed!",
                Errors = errors
            };
        }
    }
}