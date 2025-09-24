using System.ComponentModel.DataAnnotations;

namespace MemberPlus.ManagementAPI.DTO.Tenant
{
    public class CreateTenantDTO
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string ExternalId { get; set; } = string.Empty;
    }
}
