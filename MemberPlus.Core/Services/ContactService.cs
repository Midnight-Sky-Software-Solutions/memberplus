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

        public async Task<IEnumerable<ViewContacts>> QueryContacts(Guid accountId, string? searchTerm)
        {
            var sql = new StringBuilder("SELECT * FROM vwContacts WHERE AccountId = @AccountId ");
            if (searchTerm is not null)
            {
                sql.AppendLine("AND (");
                sql.AppendLine("  FirstName LIKE @SearchTerm");
                sql.AppendLine("  OR MiddleName LIKE @SearchTerm");
                sql.AppendLine("  OR LastName LIKE @SearchTerm");
                sql.AppendLine(")");
            }
            return await db.Connection.QueryAsync<ViewContacts>(sql.ToString(), new { AccountId = accountId, SearchTerm = $"%{searchTerm}%" }, transaction: db.Transaction);
        }

        private readonly DatabaseProvider db;
    }
}
