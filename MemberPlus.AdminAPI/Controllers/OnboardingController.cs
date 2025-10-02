using System.Transactions;
using MemberPlus.AdminAPI.DTO.Onboarding;
using MemberPlus.Core;
using MemberPlus.Core.Model.Account;
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
        public OnboardingController(
            TenantService tenantService,
            AccountService accountService,
            DatabaseProvider db) 
        {
            this.tenantService = tenantService;
            this.accountService = accountService;
            this.db = db;
        }

        [HttpPost]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task Onboard(OnboardTenantDTO request)
        {
            var tenant = new CreateTenant()
            {
                Id = HttpContext.GetTenantId(),
                Name = request.Name,
                ExternalId = HttpContext.GetExternalId()
            };
            var account = new CreateAccount()
            {
                Id = Guid.NewGuid(),
                TenantId = HttpContext.GetTenantId(),
                Name = "Production"
            };
            db.BeginTransaction();
            await tenantService.CreateTenant(tenant);
            await accountService.CreateAccount(account);
            db.CommitTransaction();
        }

        private readonly TenantService tenantService;
        private readonly AccountService accountService;
        private readonly DatabaseProvider db;
    }
}
