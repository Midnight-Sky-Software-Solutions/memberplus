using MemberPlus.Common;
using MemberPlus.Common.Model.Tenants;
using MemberPlus.Common.Services;
using MemberPlus.OpenAPI.Model.Onboarding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnboardingController(
        ISQLConnectionFactory sql,
        TenantsService tenantsService
        ) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Onboard(OnboardTenantDto request)
        {
            var tenantId = HttpContext.GetTenantId();
            var externalId = HttpContext.GetExternalId();
            var tenant = new OnboardTenant()
            {
                TenantId = tenantId,
                TenantName = request.Name,
                ExternalId = externalId
            };
            using (var db = sql.CreateConnection())
            {
                await tenantsService.OnboardTenant(db, tenant);
            }
            return Created();
        }
    }
}
