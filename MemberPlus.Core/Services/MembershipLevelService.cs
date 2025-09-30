using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Errors;
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

        public async Task<ReadMembershipLevel> GetMembershipLevel(Guid accountId, Guid membershipLevelId)
        {
            try
            {
                return await db.Connection.QuerySingleAsync<ReadMembershipLevel>(
                    "EXEC sp_MembershipLevel_GetMembershipLevel @AccountId, @MembershipLevelId",
                    new
                    {
                        AccountId = accountId,
                        MembershipLevelId = membershipLevelId
                    },
                    transaction: db.Transaction);
            }
            catch (InvalidOperationException)
            {
                throw new EntityNotFoundException();
            }
        }

        public async Task UpdateMembershipLevel(Guid accountId, UpdateMembershipLevel membershipLevel)
        {
            var rowsAffected = await db.Connection.ExecuteAsync(
                "EXEC sp_MembershipLevel_UpdateMembershipLevel @AccountId, @MembershipLevelId, @Name, @Price, @RenewalPeriodId, @Version",
                new
                {
                    AccountId = accountId,
                    MembershipLevelId = membershipLevel.Id,
                    Name = membershipLevel.Name,
                    Price = membershipLevel.Price,
                    RenewalPeriodId = membershipLevel.RenewalPeriodId,
                    Version = membershipLevel.Version,
                });
            if (rowsAffected < 1)
            {
                throw new EntityNotFoundException();
            }
        }

        private readonly DatabaseProvider db;
    }
}
