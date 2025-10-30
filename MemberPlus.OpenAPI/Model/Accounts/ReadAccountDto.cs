using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Accounts
{
    public record ReadAccountDto
    {
        [Required]
        public required Guid Id { get; init; }
        [Required]
        public required string Name { get; init; }
        [Required]
        public required Guid TenantId { get; init; }
        [Required]
        public required int ActiveMembers { get; init; }
    }
}
