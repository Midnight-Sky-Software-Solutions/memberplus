using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Common.Exceptions;
using MemberPlus.Common.Model;
using MemberPlus.Common.Model.Contacts;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Common.Services
{
    public class ContactsService
    {
        public async Task<Guid> CreateContact(SqlConnection db, CreateContact contact)
        {
            var passwordHasher = new PasswordHasher<Object>();
            var pw = passwordHasher.HashPassword(null!, contact.Password);
            contact.Password = pw;
            return await db.ExecuteScalarAsync<Guid>(
                "sp_CreateContact",
                contact,
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task<PageResult<ViewContacts>> QueryContacts(SqlConnection db, Guid accountId, int perPage, int pageNo, string? searchTerm)
        {
            var sql = new StringBuilder("FROM vwContacts WHERE AccountId = @AccountId ");
            if (searchTerm is not null)
            {
                sql.AppendLine("AND (");
                sql.AppendLine("  FirstName LIKE @SearchTerm");
                sql.AppendLine("  OR LastName LIKE @SearchTerm");
                sql.AppendLine(")");
            }
            var recordCount = await db.ExecuteScalarAsync<int>(
                $"SELECT COUNT(*) {sql}",
                new { AccountId = accountId, SearchTerm = $"%{searchTerm}%" });
            var results = await db.QueryAsync<ViewContacts>(
                $"SELECT * {sql} ORDER BY [Id] OFFSET {(pageNo) * perPage} ROWS FETCH NEXT {perPage} ROWS ONLY",
                new { AccountId = accountId, SearchTerm = $"%{searchTerm}%" });
            return new PageResult<ViewContacts>()
            {
                TotalRecords = recordCount,
                Items = results
            };
        }

        public async Task<ReadContact> ReadContact(SqlConnection db, Guid accountId, Guid id)
        {
            return await db.QuerySingleAsync<ReadContact>(
                "sp_ReadContact",
                new { AccountId = accountId, Id = id },
                commandType: System.Data.CommandType.StoredProcedure);
        }

        public async Task UpdateContact(SqlConnection db, UpdateContact contact)
        {
            var rowCount = await db.ExecuteAsync("sp_UpdateContact",
                contact,
                commandType: System.Data.CommandType.StoredProcedure);
            if (rowCount == 0)
            {
                throw new EntityNotFoundException();
            }
        }

        public async Task ActivateMembership(SqlConnection db, ActivateMembership options)
        {
            await db.ExecuteAsync("sp_ActivateMembership",
                options,
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
