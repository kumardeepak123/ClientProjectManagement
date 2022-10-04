using CPMS.DBConnect;
using CPMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public class ClientRepo : IClientRepo
    {
        private readonly CPMDbContext cPMDbContext;
        public ClientRepo(CPMDbContext cPMDbContext)
        {
            this.cPMDbContext = cPMDbContext;
        }
        public async Task<bool> AddClient(Client client)
        {
           cPMDbContext.Clients.Add(new Client {
               
               Name = client.Name,
               Email = client.Email,
               Password = client.Password,
               Phone = client.Phone,
               Organization = client.Organization,
               Role = client.Role,
               Projects = client.Projects,
               AgreementPaper = client.AgreementPaper,
               ProfilePicture = client.ProfilePicture
           });

            try
            {
                await cPMDbContext.SaveChangesAsync();
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message+"?????????????????????????????????????????????????");
                return false;
            }
            return true;
        }

        public async Task<IActionResult> DownloadAgreementPaper(int id)
        {
            var client =  await cPMDbContext.Clients.Where(x => x.Id == id).FirstOrDefaultAsync();
            byte[] AgreeMent = client.AgreementPaper;

            string mimeType = "application/pdf";

            return new FileContentResult(AgreeMent, mimeType)
            {
                FileDownloadName = $"AgreementPaper_{client.Name}.pdf"
            };
            
        }

        public async Task<Client> getClientById(int id)
        {
            var client =  cPMDbContext.Clients.Where(x => x.Id == id).FirstOrDefaultAsync();
            return  await  client;
        }
    }
}
