using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.Onboarding
{
    public class OnboardTenantDTO
    {
        [Required]
        public string Name { get; set; } = String.Empty;
    }
}
