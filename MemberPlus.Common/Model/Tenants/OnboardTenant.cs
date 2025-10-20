using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Tenants
{
    public record OnboardTenant
    {
        public required Guid TenantId { get; init; }
        public required string TenantName { get; init; }
        public required string ExternalId { get; init; }
    }
}
