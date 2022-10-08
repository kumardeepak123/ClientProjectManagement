﻿using CPMS.DBConnect;
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
            cPMDbContext.Clients.Add(new Client
            {

                Name = client.Name,
                Email = client.Email,
                Password = client.Password,
                Phone = client.Phone,
                Organization = client.Organization,
                Role = client.Role,
                Projects = client.Projects,
                AgreementPaperName =client.AgreementPaperName,
                ProfileImageName =client.ProfileImageName
            });

            try
            {
                await cPMDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            return true;
        }

        public async Task<Client> DeleteClient(int id)
        {
            var client = await cPMDbContext.Clients.Where(x => x.Id == id)
                                .FirstOrDefaultAsync();
            if(client == null)
            {
                return null;
            }
            cPMDbContext.Clients.Remove(client);

            await cPMDbContext.SaveChangesAsync();
            return client;
        }

        public async Task<List<Client>> getAllClients()
        {
           return await cPMDbContext.Clients.ToListAsync();
        }

        public async Task<Client> getClientById(int id)
        {
            var client = await cPMDbContext.Clients.Where(x => x.Id == id)
                               .FirstOrDefaultAsync();
            return  client;   
        }

        public async Task<Client> SignIn(string email, string password)
        {
            var client = await cPMDbContext.Clients.Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
            return client;
        }

        public async Task<bool> UpdateClient(int id, Client client)
        {
            var dbClient = await cPMDbContext.Clients.Where(x => x.Id == id).FirstOrDefaultAsync();
            if(dbClient == null)
            {
                return false;
            }

            dbClient.Name = client.Name;
            dbClient.Email = client.Email;
            dbClient.Password = client.Password;
            dbClient.Phone = client.Phone;
            dbClient.Organization = client.Organization;
            dbClient.ProfileImageName = client.ProfileImageName;
            dbClient.AgreementPaperName = client.AgreementPaperName;
            dbClient.Role = client.Role;



            try
            {
                
                await cPMDbContext.SaveChangesAsync();
            }catch(Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }

            return true;
        }
    }
}
