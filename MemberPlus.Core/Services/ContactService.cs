using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model.Contact;

namespace MemberPlus.Core.Services
{
    public class ContactService
    {
        public ContactService(DatabaseProvider db)
        {
            this.db = db;
        }

        public async Task<Guid> CreateContact(CreateContact contact)
        {
            return await db.Connection.QuerySingleAsync<Guid>("EXEC sp_Contact_CreateContact @AccountId, @FirstName, @MiddleName, @LastName, @DateOfBirth", contact, transaction: db.Transaction);
        }

        private readonly DatabaseProvider db;
    }
}
