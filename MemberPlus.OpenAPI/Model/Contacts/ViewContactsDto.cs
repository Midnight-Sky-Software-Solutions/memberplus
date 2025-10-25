using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Contacts
{
    public class ViewContactsDto
    {
        [Required]
        public required Guid Id { get; init; }
        [Required]
        public required Guid AccountId { get; init; }
        [Required]
        public required string FirstName { get; init; }
        [Required]
        public required string Email { get; init; }
        [Required]
        public required string LastName { get; init; }
        public string? Membership { get; init; }
        public string? Events { get; init; }
        public string? Donations { get; init; }
        [Required]
        public required decimal Balance { get; init; }
    }
}
