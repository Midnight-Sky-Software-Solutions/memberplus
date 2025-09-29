using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Core.Model.MembershipLevel
{
    public class ViewMembershipLevels
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public decimal Price { get; set; }
        public string RenewalPeriod { get; set; } = default!;
    }
}
