using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model.Tenants
{
    public record ReadTenant
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
        public required IEnumerable<ReadTenantAccount> Accounts { get; init; }
    }

    public record ReadTenantTenant
    {
        public required string Name { get; init; }
    }

    public record ReadTenantAccount
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
    }
}
