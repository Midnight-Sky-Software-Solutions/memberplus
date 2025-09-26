using System.Data;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Core
{
    public abstract class DatabaseProvider
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
        public abstract SqlConnection Connection { get; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

        public void BeginTransaction()
        {
            Connection.Open();
            this.transaction = Connection.BeginTransaction();
        }

        public void CommitTransaction()
        {
            this.transaction!.Commit();
            Connection.Close();
        }

        public IDbTransaction? Transaction => transaction;

        IDbTransaction? transaction;
    }
}
