using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Contacts
{
    public record UpdateContactDto
    {
        [Required]
        public required int Version { get; init; }
        [Required]
        [MaxLength(50)]
        public required string FirstName { get; init; }
        [Required]
        [MaxLength(50)]
        public required string LastName { get; init; }
        [MaxLength(50)]
        public string? Organization { get; init; }
        [Required]
        [MaxLength(50)]
        public required string Email { get; init; }
        [MaxLength(50)]
        public string? Phone { get; init; }
    }
}
