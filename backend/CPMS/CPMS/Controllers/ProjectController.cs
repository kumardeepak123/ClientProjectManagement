using CPMS.Models;
using CPMS.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepo _IProjectRepo;
        private readonly IClientRepo _IClientRepo;
        public ProjectController(IProjectRepo iProjectRepo, IClientRepo iClientRepo)
        {
            _IProjectRepo = iProjectRepo;
            _IClientRepo = iClientRepo;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProject(Project project)
        {   // default ClientId is 0
            project.ClientId = null;
            project._Client = null;
            var res = await _IProjectRepo.CreateProject(project);
            if (!res)
            {
                return Ok(new { message = "Failed to create Project" });
            }

            return Ok(new { message = "Project created successfully" });
        }

        [HttpGet("details/{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var project = await _IProjectRepo.GetProjectById(id);
            if(project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllPrjects()
        {
            var projects = await _IProjectRepo.GetAllProjects();
            if(projects == null)
            {
                return NotFound();
            }

            return Ok(projects);
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProject(int id, Project project)
        {
            var res = await  _IProjectRepo.UpdateProject(id, project);
            if (!res)
            {
                return Ok(new { message = "Failed to update" });
            }

            return Ok(new { message = "Updated successfully" });
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var res = await _IProjectRepo.DeleteProject(id);
            if (!res)
            {
                return Ok(new { message = "Failed to delete" });
            }
            return Ok(new { message = "Deleted successfully" });
        }


        [HttpGet("client/{id}")]
        [Authorize(Roles ="Admin,Client")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjectsUnderClient(int id)
        {
            var projects = await _IProjectRepo.GetProjectsUnderClient(id);
            if(projects == null)
            {
                return NotFound();
            }

            return Ok(projects);
        }
    }
}
