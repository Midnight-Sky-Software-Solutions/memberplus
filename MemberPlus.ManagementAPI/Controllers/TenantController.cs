using MemberPlus.Core;
using MemberPlus.Core.Services;
using MemberPlus.ManagementAPI.DTO.Tenant;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace MemberPlus.ManagementAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "ManageTenants")]
    public class TenantController : ControllerBase
    {
        public TenantController(TenantService tenantService) 
        {
            this.tenantService = tenantService;
        }

        [HttpGet]
        public async Task<IEnumerable<ReadTenantsDTO>> ReadTenants()
        {
            var tenants = await this.tenantService.ReadTenants();
            return tenants.Select(tenant => new ReadTenantsDTO()
            {
                Id = tenant.Id,
                Name = tenant.Name,
                ExternalId = tenant.ExternalId,
            });
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
