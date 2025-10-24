using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Common.Services
{
    public class AuthorizationService
    {
        public async Task<bool> AuthorizeAccountForTenant(SqlConnection db, Guid tenantId, Guid accountId)
        {
            return await db.ExecuteScalarAsync<bool>(
                "sp_Authorization_AuthorizeAccountForTenant",
                new { TenantId = tenantId, AccountId = accountId },
                commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
