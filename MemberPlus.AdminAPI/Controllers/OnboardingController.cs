using MemberPlus.AdminAPI.DTO.Onboarding;
using MemberPlus.Core.Model.Tenant;
using MemberPlus.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.AdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OnboardingController : ControllerBase
    {
        public OnboardingController(TenantService tenantService) 
        {
            this.tenantService = tenantService;
        }

        [HttpPost]
        public async Task Onboard(OnboardTenantDTO request)
        {
            var tenant = new CreateTenant()
            {
                Id = HttpContext.GetTenantId(),
                Name = request.Name,
                ExternalId = HttpContext.GetExternalId()
            };
            await tenantService.CreateTenant(tenant);
        }

        private readonly TenantService tenantService;
    }
}
