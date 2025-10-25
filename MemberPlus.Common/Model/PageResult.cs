using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MemberPlus.Common.Model
{
    public record PageResult<T>
    {
        public required int TotalRecords { get; init; }
        public required IEnumerable<T> Items { get; init; }
    }
}
