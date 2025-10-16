using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace MemberPlus.Common
{
    public class LocalhostSQLConnectionFactory : ISQLConnectionFactory
    {
        public SqlConnection CreateConnection()
        {
            return new SqlConnection(connectionString);
        }

        const string connectionString = "Data Source=localhost;Database=MemberPlus;Integrated Security=sspi;TrustServerCertificate=true;";
    }
}
