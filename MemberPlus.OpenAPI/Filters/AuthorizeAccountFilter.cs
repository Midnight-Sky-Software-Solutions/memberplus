using MemberPlus.Common;
using MemberPlus.Common.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MemberPlus.OpenAPI.Filters
{
    public class AuthorizeAccountFilter(
        ISQLConnectionFactory sql, 
        AuthorizationService authorizationService) : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var accountId = Guid.Parse((string)context.RouteData.Values["accountId"]!);
            var tenantId = context.HttpContext.GetTenantId();
            using (var db = sql.CreateConnection())
            {
                var authorizationResult = authorizationService.AuthorizeAccountForTenant(db, tenantId, accountId).Result;
                if (!authorizationResult)
                {
                    context.Result = new ForbidResult();
                }
            }
        }
    }
}
