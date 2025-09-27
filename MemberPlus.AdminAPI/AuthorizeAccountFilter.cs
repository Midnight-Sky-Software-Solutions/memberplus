using MemberPlus.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MemberPlus.AdminAPI
{
    public class AuthorizeAccountFilter : IAuthorizationFilter
    {
        public AuthorizeAccountFilter(AuthorizationService authService)
        {
            this.authorizationService = authService;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var accountId = Guid.Parse((string)context.RouteData.Values["accountId"]!);
            var tenantId = context.HttpContext.GetTenantId();
            var authorizationResult = authorizationService.AuthorizeAccountForTenant(tenantId, accountId).Result;
            if (!authorizationResult)
            {
                context.Result = new ForbidResult();
            }
        }

        private readonly AuthorizationService authorizationService;
    }
}
