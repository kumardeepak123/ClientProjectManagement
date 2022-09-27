using CPMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Repository
{
    interface IClientRepo
    {
        //get
        //post
        Task<int> AddClient(Client client);
        //update
        //delete
    }
}
