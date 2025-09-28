using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model;
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

        public async Task<Page<ViewContacts>> QueryContacts(Guid accountId, int perPage, int pageNo, string? searchTerm, int? sortOrder, string? sortField)
        {
            var sql = new StringBuilder("FROM vwContacts WHERE AccountId = @AccountId ");
            if (searchTerm is not null)
            {
                sql.AppendLine("AND (");
                sql.AppendLine("  FirstName LIKE @SearchTerm");
                sql.AppendLine("  OR MiddleName LIKE @SearchTerm");
                sql.AppendLine("  OR LastName LIKE @SearchTerm");
                sql.AppendLine(")");
            }
            var sort = new StringBuilder();
            if (sortField is not null)
            {
                sort.AppendLine("ORDER BY ");
                switch (sortField)
                {
                    case "firstName":
                        sort.Append("FirstName"); break;
                    case "middleName":
                        sort.Append("MiddleName"); break;
                    case "lastName":
                        sort.Append("LastName"); break;
                    case "dateOfBirth":
                        sort.Append("DateOfBirth"); break;
                }
                if (sortOrder == -1)
                {
                    sort.Append(" DESC");
                    sort.AppendLine();
                }
            }
            var recordCount = await db.Connection.ExecuteScalarAsync<int>($"SELECT COUNT(*) {sql}", new { AccountId = accountId, SearchTerm = $"%{searchTerm}%" }, transaction: db.Transaction);
            var results = await db.Connection.QueryAsync<ViewContacts>($"SELECT * {sql} {sort} OFFSET {(pageNo)*perPage} ROWS FETCH NEXT {perPage} ROWS ONLY", new { AccountId = accountId, SearchTerm = $"%{searchTerm}%" }, transaction: db.Transaction);
            return new Page<ViewContacts>()
            {
                TotalRecords = recordCount,
                Items = results
            };
        }

        private readonly DatabaseProvider db;
    }
}
