using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Core.Model.Contact
{
    public class ReadContact
    {
        public Guid Id { get; set; }
        public int Version { get; set; }
        public string FirstName { get; set; } = default!;
        public string MiddleName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public DateTimeOffset? DateOfBirth { get; set; }
        [Required]
        public string MemberStatus { get; set; } = default!;
        public DateTimeOffset? SubscriptionStartDate { get; set; }
        public DateTimeOffset? SubscriptionEndDate { get; set; }
    }
}
