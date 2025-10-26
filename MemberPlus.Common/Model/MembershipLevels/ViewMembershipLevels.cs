using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.MembershipLevels
{
    public record ViewMembershipLevels
    {
        public required Guid Id { get; init; }
        public required Guid AccountId { get; init; }
        public required string Name { get; init; }
        public required decimal Price { get; init; }
        public required string RenewalPeriodName { get; init; }
        public required string RenewalPeriodCode { get; init; }
    }
}
