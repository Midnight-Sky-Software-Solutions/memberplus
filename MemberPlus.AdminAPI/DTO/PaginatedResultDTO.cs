using System.ComponentModel.DataAnnotations;

namespace MemberPlus.AdminAPI.DTO
{
    public class PaginatedResultDTO<T>
    {
        [Required]
        public int TotalRecords { get; set; }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
        [Required]
        public IEnumerable<T> Items { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    }
}
