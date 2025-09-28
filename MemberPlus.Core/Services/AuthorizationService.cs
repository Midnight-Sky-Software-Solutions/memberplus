using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace MemberPlus.Core.Services
{
    public class AuthorizationService
    {
        public AuthorizationService(DatabaseProvider db)
        {
            this.db = db;
        }

        public async Task<bool> AuthorizeAccountForTenant(Guid tenantId, Guid accountId)
        {
            return await db.Connection.ExecuteScalarAsync<bool>(
                "EXEC sp_Authorization_AuthorizeAccountForTenant @TenantId, @AccountId", 
                new { TenantId = tenantId, AccountId = accountId }, 
                transaction: db.Transaction);
        }

        private readonly DatabaseProvider db;
    }
}
