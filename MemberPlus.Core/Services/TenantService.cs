using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
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
            var rowsAffected = await db.Connection.ExecuteAsync(
                "EXEC sp_Tenant_CreateTenant @Id, @Name, @ExternalId", 
                tenant, 
                transaction: db.Transaction);
        }

        public async Task<IEnumerable<ReadTenants>> ReadTenants()
        {
            return await db.Connection.QueryAsync<ReadTenants>(
                "EXEC sp_Tenant_ReadTenants", 
                transaction: db.Transaction);
        }

        public async Task<ReadTenant> ReadTenant(Guid tenantId)
        {
            return await db.Connection.QuerySingleAsync<ReadTenant>(
                "EXEC sp_Tenant_ReadTenant @TenantId", 
                new { TenantId = tenantId }, 
                transaction: db.Transaction);
        }

        public async Task UpdateTenant(UpdateTenant tenant)
        {
            await db.Connection.ExecuteAsync(
                "EXEC sp_Tenant_UpdateTenant @Id, @Name, @ExternalId", 
                tenant, 
                transaction: db.Transaction);
        }

        private readonly DatabaseProvider db;
    }
}
