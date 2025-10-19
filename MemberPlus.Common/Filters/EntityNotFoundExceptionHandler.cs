using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MemberPlus.Common.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace MemberPlus.Common.Filters
{
    public class EntityNotFoundExceptionHandler : IExceptionHandler
    {
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async ValueTask<bool> TryHandleAsync(
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            if (exception is EntityNotFoundException)
            {
                httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                return true;
            }

            return false;
        }
    }
}
