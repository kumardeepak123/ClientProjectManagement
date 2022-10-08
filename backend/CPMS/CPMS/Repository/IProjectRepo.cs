using CPMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public interface IProjectRepo
    {
        Task<bool> CreateProject(Project project);
        Task<Project> GetProjectById(int id);
        Task<IEnumerable<Project>> GetAllProjects();
        Task<bool> UpdateProject(int id, Project project);
        Task<bool> DeleteProject(int id);
        Task<List<Project>> GetProjectsUnderClient(int id);
    }
}
