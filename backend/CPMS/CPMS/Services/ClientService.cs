using CPMS.Models;
using CPMS.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CPMS.Services
{
    public class ClientService : IClientRepo
    {
        public Task<int> AddClient(Client client)
        {
            throw new NotImplementedException();
        }
    }
}
