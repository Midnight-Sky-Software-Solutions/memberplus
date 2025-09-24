using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model.Tenant;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Core.Services
{
    public class TenantService
    {
        public TenantService(DatabaseProvider db) 
        {
            this.db = db;
        }

        public async Task CreateTenant(CreateTenant tenant)
        {
            await db.Connection.ExecuteAsync("EXEC sp_Tenant_CreateTenant @Id, @Name, @ExternalId", tenant);
        }

        private DatabaseProvider db;
    }
}
