using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.MembershipLevel
{
    public class CreateMembershipLevelDTO
    {
        [Required]
        public string Name { get; set; } = default!;
        [Required]
        [Range(typeof(decimal), "0", "9999")]
        public decimal Price { get; set; }
        [Required]
        public int RenewalPeriodId { get; set; }
    }
}
