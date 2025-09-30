using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.MembershipLevel
{
    public class UpdateMembershipLevelDTO
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = default!;
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int RenewalPeriodId { get; set; }
        [Required]
        public int Version { get; set; }
    }
}
