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
        public async ValueTask<bool> TryHandleAsync(
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
