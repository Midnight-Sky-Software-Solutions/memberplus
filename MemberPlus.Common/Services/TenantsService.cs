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
        public async Task<ReadTenant> ReadTenant(SqlConnection db, Guid id)
        {
            var result = await db.QuerySingleOrDefaultAsync<ReadTenant>(
                "sp_ReadTenant",
                new
                {
                    Id = id
                },
                commandType: CommandType.StoredProcedure);
            if (result == null)
            {
                throw new EntityNotFoundException();
            }
            return result;
        }
    }
}
