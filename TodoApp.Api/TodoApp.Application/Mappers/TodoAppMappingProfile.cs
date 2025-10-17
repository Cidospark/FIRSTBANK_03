using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TodoApp.Application.DTOs.Request;
using TodoApp.Application.DTOs.Response;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Mappers
{
    public class TodoAppMappingProfile : Profile
    {
        public TodoAppMappingProfile()
        {
            CreateMap<Todo, TodoRequest>().ReverseMap();
            CreateMap<TodoResponse, Todo>().ReverseMap();

            CreateMap<User, UserRequest>().ReverseMap();
            CreateMap<UserResponse, User>().ReverseMap();
            CreateMap<UsersResponse, User>().ReverseMap();
        }
    }
}