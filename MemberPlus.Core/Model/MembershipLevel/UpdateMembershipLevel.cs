using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Core.Model.MembershipLevel
{
    public class UpdateMembershipLevel
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
        public int RenewalPeriodId { get; set; }
        public int Version { get; set; }
    }
}
