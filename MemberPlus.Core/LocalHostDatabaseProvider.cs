using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Core
{
    public class LocalHostDatabaseProvider : DatabaseProvider
    {
        public override SqlConnection Connection
        {
            get
            {
                if (connection == null)
                {
                    this.connection = new SqlConnection("Data Source=localhost;Database=MemberPlus;Integrated Security=sspi;TrustServerCertificate=true;");
                }
                return connection;
            }
        }

        private SqlConnection? connection;
    }
}
