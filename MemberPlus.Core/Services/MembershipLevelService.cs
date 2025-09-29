using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model;
using MemberPlus.Core.Model.Contact;
using MemberPlus.Core.Model.MembershipLevel;
using Microsoft.Identity.Client;

namespace MemberPlus.Core.Services
{
    public class MembershipLevelService
    {
        public MembershipLevelService(DatabaseProvider db) 
        {
            this.db = db;
        }

        public async Task<Guid> CreateMembershipLevel(CreateMembershipLevel membershipLevel)
        {
            return await db.Connection.ExecuteScalarAsync<Guid>(
                "EXEC sp_MembershipLevel_CreateMembershipLevel @AccountId, @Name, @Price, @RenewalPeriodId",
                membershipLevel,
                transaction: db.Transaction);
        }

        public async Task<IEnumerable<ViewMembershipLevels>> QueryMembershipLevels(Guid accountId)
        {
            var sql = new StringBuilder("FROM vwMembershipLevels WHERE AccountId = @AccountId ");
            var results = await db.Connection.QueryAsync<ViewMembershipLevels>(
                $"SELECT * {sql}",
                new { AccountId = accountId },
                transaction: db.Transaction);
            return results;
        }

        private readonly DatabaseProvider db;
    }
}
