using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.RenewalPeriod
{
    public class RenewalPeriodDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = default!;
    }
}
