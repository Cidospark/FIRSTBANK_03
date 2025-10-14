using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EmployeeManagmeentSystem.Application.DTOs.Request;
using EmployeeManagmeentSystem.Application.DTOs.Response;
using EmployeeManagmentSystem.Domain.Entities;

namespace EmployeeManagmeentSystem.Application.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<EmployeeRequest, Employee>();
            CreateMap<Employee, EmployeeResponse>();
            
            CreateMap<DepartmentRequest, Employee>();
            CreateMap<Employee, DepartmentResponse>();
        }
    }
}