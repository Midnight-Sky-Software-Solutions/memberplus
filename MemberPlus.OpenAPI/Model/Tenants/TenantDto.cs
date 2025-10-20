using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Tenants
{
    public record TenantDto
    {
        [Required]
        public required Guid Id { get; init; }
        [Required]
        public required string Name { get; init; }
        [Required]
        public required IEnumerable<TenantAccountDto> Accounts { get; init; }
    }

    public record TenantAccountDto
    {
        [Required]
        public required Guid Id { get; init; }
        [Required]
        public required string Name { get; init; }
    }
}
