﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CPMS.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required,MaxLength(30)]
        public string Name { get; set; }

        [Required, MaxLength(30)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required, MaxLength(10)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        public int Phone { get; set; }

        [Required, MaxLength(30)]
        
        public string Organization { get; set; }

        [Required]
        public byte[] AgreementPaper { get; set; }

        [Required, MaxLength(10)]
        public string Role { get; set; }

        public List<Project> Projects { get; set; }
    }
}