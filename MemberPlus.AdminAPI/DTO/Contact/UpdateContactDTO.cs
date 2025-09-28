using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.Contact
{
    public class UpdateContactDTO
    {
        public Guid Id { get; set; }
        public int Version { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset? DateOfBirth { get; set; }
    }
}
