using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO.Contact
{
    public class ViewContactsDTO
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string FirstName { get; set; } = default!;
        public string MiddleName { get; set; } = default!;
        [Required]
        public string LastName { get; set; } = default!;
        public DateTime? DateOfBirth { get; set; }
        [Required]
        public string MemberStatus { get; set; } = default!;
    }
}
