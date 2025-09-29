
using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.Dashboard
{
    public class DashboardDTO
    {
        [Required]
        public string TenantName { get; set; } = String.Empty;
        public Guid AccountId { get; set; }
    }
}
