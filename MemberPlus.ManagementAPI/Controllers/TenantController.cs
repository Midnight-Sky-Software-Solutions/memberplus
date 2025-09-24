using MemberPlus.Core;
using MemberPlus.Core.Services;
using MemberPlus.ManagementAPI.DTO.Tenant;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace MemberPlus.ManagementAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TenantController : ControllerBase
    {
        public TenantController(TenantService tenantService) 
        {
            this.tenantService = tenantService;
        }

        [HttpPost]
        public async Task CreateTenant(CreateTenantDTO request)
        {
            await tenantService.CreateTenant(new Core.Model.Tenant.CreateTenant
            {
                Id = request.Id,
                ExternalId = request.ExternalId,
                Name = request.Name,
            });
        }

        private readonly TenantService tenantService;
    }
}
