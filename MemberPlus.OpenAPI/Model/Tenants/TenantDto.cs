namespace MemberPlus.OpenAPI.Model.Tenants
{
    public class TenantDto
    {
        public required Guid Id { get; set; }
        public required string Name { get; init; }
    }
}
