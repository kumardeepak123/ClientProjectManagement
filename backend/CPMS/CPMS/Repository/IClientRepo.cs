using CPMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    public interface IClientRepo
    {
        //get
        Task<Client> getClientById(int id);
        Task<IActionResult> DownloadAgreementPaper(int id);
        //post
        Task<bool> AddClient(Client client);
        //update
        //delete
    }
}
