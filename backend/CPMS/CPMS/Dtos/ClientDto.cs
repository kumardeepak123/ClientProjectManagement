using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CPMS.Dtos
{
    public class ClientDto
    {
      
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

       
        
        public string Phone { get; set; }

       
        public string Organization { get; set; }


        public IFormFile AgreementPaper { get; set; }

        public IFormFile ProfilePicture { get; set; }
        public string Role { get; set; }

    }
}
