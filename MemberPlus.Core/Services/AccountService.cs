using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MemberPlus.Core.Model.Account;

namespace MemberPlus.Core.Services
{
    public class AccountService
    {
        public AccountService(DatabaseProvider db) 
        {
            this.db = db;
        }

        public async Task CreateAccount(CreateAccount account)
        {
            await db.Connection.ExecuteAsync("sp_Account_CreateAccount @Id, @TenantId, @Name", 
                account, 
                transaction: db.Transaction);
        }

        private readonly DatabaseProvider db;
    }
}
