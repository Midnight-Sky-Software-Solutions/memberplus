using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Common.Model.MembershipLevels;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Common.Services
{
    public class MembershipLevelsService
    {
        public async Task<IEnumerable<ViewMembershipLevels>> QueryMembershipLevels(SqlConnection db, Guid accountId)
        {
            return await db.QueryAsync<ViewMembershipLevels>(@"SELECT Id, AccountId, Name, Price, RenewalPeriodName, RenewalPeriodCode
                                                               FROM dbo.vwMembershipLevels
                                                               WHERE AccountId = @AccountId",
                                                             new { AccountId = accountId });
        }
    }
}
