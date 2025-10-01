using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model.MemberStatusType;

namespace MemberPlus.Core.Services
{
    internal class MemberStatusTypeService
    {
        public MemberStatusTypeService(DatabaseProvider db) 
        { 
            this.db = db;
        }

        public async Task<IEnumerable<ViewMemberStatusTypes>> QueryMemberStatusTypes()
        {
            return await db.Connection.QueryAsync<ViewMemberStatusTypes>(
                "SELECT Id, [Name] FROM vwMemberStatusTypes ORDER BY ID",
                transaction: db.Transaction);
        }

        private readonly DatabaseProvider db;
    }
}
