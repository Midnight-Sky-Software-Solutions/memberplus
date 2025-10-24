using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Contacts
{
    public record CreateContactDto
    {
        [Required]
        [MaxLength(100)]
        public required string Password { get; init; }
        [Required]
        [MaxLength(100)]
        public required string FirstName { get; init; }
        [Required]
        [MaxLength(100)]
        public required string LastName { get; init; }
        [MaxLength(100)]
        public required string Organization { get; init; }
        [Required]
        [MaxLength(100)]
        public required string Email { get; init; }
        [MaxLength(50)]
        public required string Phone { get; init; }
    }
}
