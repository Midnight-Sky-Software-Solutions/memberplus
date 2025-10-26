using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Contacts
{
    public record ActivateMembership
    {
        public required Guid AccountId { get; set; }
        public required Guid ContactId { get; set; }
        public required Guid MembershipLevelId { get; set; }
        public DateTime StartDate => DateTime.Now;
    }
}
