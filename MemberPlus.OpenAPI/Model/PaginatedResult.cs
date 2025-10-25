using System.ComponentModel.DataAnnotations;

namespace MemberPlus.OpenAPI.Model
{
    public record PaginatedResult<T>
    {
        [Required]
        public required int TotalRecords { get; init; }
        [Required]
        public required IEnumerable<T> Items { get; init; }
    }
}
