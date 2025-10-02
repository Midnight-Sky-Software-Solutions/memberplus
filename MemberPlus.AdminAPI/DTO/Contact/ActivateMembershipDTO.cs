using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.Contact
{
    public class ActivateMembershipDTO
    {
        [Required]
        public Guid MembershipLevelId { get; set; }
        [Required]
        public DateTimeOffset StartDate { get; set; }
    }
}
