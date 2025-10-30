using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Accounts
{
    public record ReadAccount
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public required Guid TenantId {  get; set; }
        public required int ActiveMembers { get; set; }
    }
}
