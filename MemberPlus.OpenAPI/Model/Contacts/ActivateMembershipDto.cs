using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model.Contacts
{
    public record ActivateMembershipDto
    {
        [Required]
        public required Guid MembershipLevelId { get; set; }
    }
}
