using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.Contact
{
    public class ReadContactDTO
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public int Version { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        [Required]
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset? DateOfBirth { get; set; }
        [Required]
        public string MemberStatus { get; set; } = default!;
    }
}
