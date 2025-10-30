using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Accounts
{
    public record ReadAccountDto
    {
        [Required]
        public required Guid Id { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required Guid TenantId { get; set; }
        [Required]
        public required int ActiveMembers { get; set; }
    }
}
