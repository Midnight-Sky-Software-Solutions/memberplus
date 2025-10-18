using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace MemberPlus.Common
{
    public static class HttpContextExtensions
    {
        public static Guid GetTenantId(this HttpContext httpContext)
        {
            var item = httpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("memberplus/tenant_id"));
            if (item == null)
            {
                throw new AuthenticationException("No Tenant ID was found in the HTTP context items");
            }
            return Guid.Parse(item.Value.ToString());
        }

        public static string GetExternalId(this HttpContext httpContext)
        {
            var item = httpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"));
            if (item == null)
            {
                throw new AuthenticationException("No User ID was found in the HTTP context items");
            }
            return item.Value.ToString();
        }
    }
}
