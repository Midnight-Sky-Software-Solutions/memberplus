using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Contacts
{
    public record CancelMembership
    {
        public required Guid ContactId { get; init; }
        public required Guid AccountId { get; init; }
    }
}
