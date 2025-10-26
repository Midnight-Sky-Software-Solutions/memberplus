using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.MembershipLevels
{
    public class ViewMembershipLevelsDto
    {
        [Required]
        public required Guid Id { get; init; }
        [Required]
        public required Guid AccountId { get; init; }
        [Required]
        public required string Name { get; init; }
        [Required]
        public required decimal Price { get; init; }
        [Required]
        public required string RenewalPeriodName { get; init; }
        [Required]
        public required string RenewalPeriodCode { get; init; }
    }
}
