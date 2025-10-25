using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Contacts
{
    public record ViewContacts
    {
        public required Guid Id { get; init; }
        public required Guid AccountId { get; init; }
        public required string FirstName { get; init; }
        public required string LastName { get; init; }
        public required string Email { get; init; }
        public string? Membership { get; init; }
        public string? Events { get; init; }
        public string? Donations { get; init; }
        public required decimal Balance { get; init; }
    }
}
