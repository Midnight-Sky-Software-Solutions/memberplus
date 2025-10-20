namespace MemberPlus.OpenAPI.Model.Tenants
{
    public record TenantDto
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
        public required IEnumerable<TenantAccountDto> Accounts { get; init; }
    }

    public record TenantAccountDto
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
    }
}
