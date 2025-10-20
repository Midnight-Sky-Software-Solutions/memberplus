using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Common.Exceptions;
using MemberPlus.Common.Model.Tenants;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Common.Services
{
    public class TenantsService
    {
        public async Task OnboardTenant(SqlConnection db, OnboardTenant tenant)
        {
            await db.ExecuteAsync("sp_OnboardTenant", tenant, commandType: CommandType.StoredProcedure);
        }

        public async Task<ReadTenant> ReadTenant(SqlConnection db, Guid id)
        {
            using (var multi = await db.QueryMultipleAsync(
                "sp_ReadTenant",
                new
                {
                    Id = id,
                },
                commandType: CommandType.StoredProcedure))
            {
                var tenant = await multi.ReadSingleOrDefaultAsync<ReadTenant>();
                if (tenant == null)
                {
                    throw new EntityNotFoundException();
                }
                var accounts = await multi.ReadAsync<ReadTenantAccount>();
                return new ReadTenant
                {
                    Id = tenant.Id,
                    Name = tenant.Name,
                    Accounts = accounts,
                };
            }
        }
    }
}
