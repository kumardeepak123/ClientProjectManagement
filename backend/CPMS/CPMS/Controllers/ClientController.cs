using CPMS.Dtos;
using CPMS.Models;
using CPMS.Repository;
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

        public ClientController(IClientRepo iClientRepo)
        {
            _IClientRepo = iClientRepo;
        }

        //create

        [HttpPost("create")]
        public async Task<IActionResult> CreateClient([FromForm] ClientDto  clientDto)
        {
            //string extn = clientDto.AgreementPaper.FileName;
            Client client = new Client
            {
                Id = clientDto.Id,
                Name = clientDto.Name,
                Email = clientDto.Email,
                Password = clientDto.Password,
                Phone = clientDto.Phone,
                Organization = clientDto.Organization,
                Role = clientDto.Role,
                Projects = new List<Project>()
            };
            //return Ok(client);
            using (var target = new MemoryStream())
            {
                if (!clientDto.AgreementPaper.FileName.Contains(".pdf"))
                {
                    return Ok(new { success = false, message = "Please select pdf files" });
                }
                clientDto.AgreementPaper.CopyTo(target);
                client.AgreementPaper = target.ToArray();
            }

             using(var t = new MemoryStream())
            {
                clientDto.ProfilePicture.CopyTo(t);
                client.ProfilePicture = t.ToArray();
            }

            var success = await _IClientRepo.AddClient(client);

            if (success == false)
            {
                return StatusCode(502);
            }

            return Ok(new
            {
                success = true,
                message = "Client registered successfully"
            });
        }
        //get

        [HttpGet]
        [Route("details/{id}")]
        public  async Task<IActionResult > GetClientById(int id)
        {
            var client =  await _IClientRepo.getClientById(id);
 
            return Ok(client);
           
        }

        [HttpGet("agreementpaper/download/{id}")]
        public async Task<IActionResult> DownloadAgreement(int id)
        {
            var res = await _IClientRepo.DownloadAgreementPaper(id);

            return Ok(res);
        }
        //update
        //delete
    }

}
