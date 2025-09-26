using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model.AdminDashboard;

namespace MemberPlus.Core.Services
{
    public class AdminDashboardService
    {
        public AdminDashboardService(DatabaseProvider db) 
        {
            this.db = db;
        }

        public async Task<ReadDashboard> ReadDashboard(Guid tenantId)
        {
            return await db.Connection.QuerySingleAsync<ReadDashboard>("EXEC sp_AdminDashboard_ReadDashboard @TenantId", new { TenantId = tenantId });
        }

        private readonly DatabaseProvider db;
    }
}
