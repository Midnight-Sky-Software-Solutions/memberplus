using System.ComponentModel.DataAnnotations;

namespace MemberPlus.ManagementAPI.DTO.Tenant
{
    public class ReadTenantsDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ExternalId { get; set; } = string.Empty;
    }
}
