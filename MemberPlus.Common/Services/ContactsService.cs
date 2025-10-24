using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Common.Model.Contacts;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Common.Services
{
    public class ContactsService
    {
        public async Task<Guid> CreateContact(SqlConnection db, CreateContact contact)
        {
            return await db.ExecuteScalarAsync<Guid>(
                "sp_CreateContact",
                contact,
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
