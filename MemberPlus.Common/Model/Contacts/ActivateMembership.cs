using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Contacts
{
    public record ActivateMembership
    {
        public required Guid AccountId { get; init; }
        public required Guid ContactId { get; init; }
        public required Guid MembershipLevelId { get; init; }
        public required DateTimeOffset StartDate { get; init; }
    }
}
