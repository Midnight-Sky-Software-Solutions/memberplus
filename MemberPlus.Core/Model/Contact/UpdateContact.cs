
namespace MemberPlus.Core.Model.Contact
{
    public class UpdateContact
    {
        public Guid Id { get; set; }
        public int Version { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string MiddleName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTimeOffset? DateOfBirth { get; set; }
    }
}
