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
    public class TenantsController : ControllerBase
    {
        public TenantsController(TenantService tenantService) 
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

        [HttpGet("{tenantId:guid}")]
        public async Task<ReadTenantDTO> ReadTenant([FromRoute] Guid tenantId)
        {
            var tenant = await tenantService.ReadTenant(tenantId);
            return new ReadTenantDTO()
            {
                Id = tenant.Id,
                Name = tenant.Name,
                ExternalId = tenant.ExternalId,
            };
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

        [HttpPut]
        public async Task UpdateTenant(UpdateTenantDTO request)
        {
            await tenantService.UpdateTenant(new Core.Model.Tenant.UpdateTenant
            {
                Id = request.Id,
                Name = request.Name,
                ExternalId = request.ExternalId,
            });
        }

        private readonly TenantService tenantService;
    }
}
