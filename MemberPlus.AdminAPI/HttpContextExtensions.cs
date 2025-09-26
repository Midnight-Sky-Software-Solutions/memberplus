using System.Security.Authentication;

namespace MemberPlus.AdminAPI
{
    public static class HttpContextExtensions
    {
        public static Guid GetTenantId(this HttpContext httpContext)
        {
            var item = httpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("memberplus/tenant_id"));
            if (item == null)
            {
                throw new AuthenticationException("No UserID was found in the HTTP context items");
            }
            return Guid.Parse(item.Value.ToString());
        }
    }
}
