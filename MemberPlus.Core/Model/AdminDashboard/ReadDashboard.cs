using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Core.Model.AdminDashboard
{
    public class ReadDashboard
    {
        public string TenantName { get; set; } = String.Empty;
        public Guid AccountId { get; set; }
    }
}
