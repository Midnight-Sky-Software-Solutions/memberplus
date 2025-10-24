using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Contacts
{
    public record CreateContact
    {
        public required Guid AccountId { get; init; }
        public required string Password { get; init; }
        public required string FirstName { get; init; }
        public required string LastName { get; init; }
        public string? Organization { get; init; }
        public required string Email { get; init; }
        public string? Phone { get; init; }
    }
}
