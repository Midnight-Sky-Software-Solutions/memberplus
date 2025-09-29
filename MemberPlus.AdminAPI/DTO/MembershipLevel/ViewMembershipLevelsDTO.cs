using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.MembershipLevel
{
    public class ViewMembershipLevelsDTO
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = default!;
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string RenewalPeriod { get; set; } = default!;
    }
}
