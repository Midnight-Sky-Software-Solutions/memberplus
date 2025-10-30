using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Common.Exceptions;
using MemberPlus.Common.Model.Accounts;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Common.Services
{
    public class AccountsService
    {
        public async Task<ReadAccount> ReadAccount(SqlConnection db, Guid id)
        {
            var result = await db.QuerySingleOrDefaultAsync<ReadAccount>(
                "sp_ReadAccount",
                new { Id = id },
                commandType: System.Data.CommandType.StoredProcedure);
            if (result is null)
            {
                throw new EntityNotFoundException();
            }
            return result;
        }
    }
}
