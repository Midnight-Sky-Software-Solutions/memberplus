using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Contacts
{
    public class ReadContactDto
    {
        [Required]
        public required int Version { get; init; }
        [Required]
        public required Guid Id { get; init; }
        [Required]
        public required Guid AccountId { get; init; }
        [Required]
        public required string FirstName { get; init; }
        [Required]
        public required string LastName { get; init; }
        [Required]
        public required string Email { get; init; }
        public string? Phone { get; init; }
        public string? Organization { get; init; }
        public DateTimeOffset? LastLogin { get; init; }
        public DateTimeOffset? DateUpdated { get; init; }
        public string? Membership { get; init; }
        public string? Events { get; init; }
        public string? Donations { get; init; }
        [Required]
        public required decimal Balance { get; init; }
        [Required]
        public required string MemberStatusName { get; init; }
        [Required]
        public required string MemberStatusCode { get; init; }
        public string? MembershipLevelName { get; init; }
        public DateTimeOffset? SubscriptionStartDate { get; init; }
        public DateTimeOffset? SubscriptionEndDate { get; init; }
    }
}
