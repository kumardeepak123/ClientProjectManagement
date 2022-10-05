using CPMS.Models;
using CPMS.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepo _IClientRepo;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ClientController(IClientRepo iClientRepo, IWebHostEnvironment hostEnvironment)
        {
            _IClientRepo = iClientRepo;
            this._hostEnvironment = hostEnvironment;
        }

        

        [HttpPost("create")]
        public async Task<IActionResult> CreateClient([FromForm] Client client)
        {
            string FileExtension = Path.GetExtension(client.AgreementPaperFile.FileName);
            if(FileExtension != ".pdf")
            {
                return BadRequest(new { message = "Please select pdf files" });
            }
            client.ProfileImageName = await SaveFile(client.ProfileImageFile);
            client.AgreementPaperName = await SaveFile(client.AgreementPaperFile);

            var res = await _IClientRepo.AddClient(client);
            if (res)
            {
                return Ok(new { message = "Client created successfully" });
            }

            return StatusCode(501);
        }
        
        [HttpGet]
        [Route("details/{id}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            var client = await _IClientRepo.getClientById(id);
            if(client == null)
            {
                return NotFound(new { message="User not found with id "+id});
            }
            client.ProfileImageSrc = String.Format("{0}://{1}{2}/UploadFiles/{3}", Request.Scheme, Request.Host, Request.PathBase, client.ProfileImageName);
            client.AgreementPaperSrc = String.Format("{0}://{1}{2}/UploadFiles/{3}", Request.Scheme, Request.Host, Request.PathBase, client.AgreementPaperName);
            return Ok(client);

        }

        [HttpGet("all")]
        public  async Task<ActionResult<List<Client>>> GetAllClients()
        {
            var clients = await _IClientRepo.getAllClients();

            var res = clients.Where(x=> x.Role == "Client").Select(client => new Client
            {   Id = client.Id,
                Name =client.Name,
                Email = client.Email,
                Phone = client.Phone,
                Organization = client.Organization,
                ProfileImageSrc = String.Format("{0}://{1}{2}/UploadFiles/{3}", Request.Scheme, Request.Host, Request.PathBase, client.ProfileImageName),
                AgreementPaperSrc = String.Format("{0}://{1}{2}/UploadFiles/{3}", Request.Scheme, Request.Host, Request.PathBase, client.AgreementPaperName)
            }).ToList();

            return Ok(res);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateClient(int id,[FromForm] Client client)
        {
            if (client.ProfileImageFile != null)
            {
                DeleteFile(client.ProfileImageName);
                client.ProfileImageName = await SaveFile(client.ProfileImageFile);
            }

            if (client.AgreementPaperFile != null)
            {
                DeleteFile(client.AgreementPaperName);
                client.AgreementPaperName = await SaveFile(client.AgreementPaperFile);
            }
            var res =  await _IClientRepo.UpdateClient(id, client);
            if (!res)
            {
                return Ok(new { message = "Failed to update" });
            }

            return Ok(new { message = "Update successfull" });
        }

       


        [NonAction]
        public async Task<string> SaveFile(IFormFile file)
        {
            string fileName = new String(Path.GetFileNameWithoutExtension(file.FileName).Take(10).ToArray()).Replace(' ', '-');
            fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(_hostEnvironment.ContentRootPath, "UploadFiles", fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return fileName;
        }

        [NonAction]
        public void DeleteFile(string fileName) 
        {
            var filePath = Path.Combine(_hostEnvironment.ContentRootPath, "UploadFiles", fileName);
            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);
        }

        //---
       
    }

}
