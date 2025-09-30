using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model.RenewalPeriod;

namespace MemberPlus.Core.Services
{
    public class RenewalPeriodService
    {
        public RenewalPeriodService(DatabaseProvider db)
        {
            this.db = db;
        }

        public async Task<IEnumerable<ViewRenewalPeriods>> QueryRenewalPeriods()
        {
            return await db.Connection.QueryAsync<ViewRenewalPeriods>(
                "SELECT Id, [Name] FROM vwRenewalPeriods ORDER BY ID",
                transaction: db.Transaction);
        }

        private readonly DatabaseProvider db;
    }
}
