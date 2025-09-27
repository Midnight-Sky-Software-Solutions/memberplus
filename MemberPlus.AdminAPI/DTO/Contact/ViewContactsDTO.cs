namespace MemberPlus.AdminAPI.DTO.Contact
{
    public class ViewContactsDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime? DateOfBirth { get; set; }
    }
}
