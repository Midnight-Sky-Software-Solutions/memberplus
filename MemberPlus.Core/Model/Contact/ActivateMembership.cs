using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Core.Model.Contact
{
    public class ActivateMembership
    {
        public Guid AccountId { get; set; }
        public Guid ContactId { get; set; }
        public Guid MembershipLevelId { get; set; }
        public DateTimeOffset StartDate { get; set; }
    }
}
