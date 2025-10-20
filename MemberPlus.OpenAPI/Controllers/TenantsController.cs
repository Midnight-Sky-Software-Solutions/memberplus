using MemberPlus.Common;
using MemberPlus.Common.Services;
using MemberPlus.OpenAPI.Model.Tenants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TenantsController : ControllerBase
    {
        public TenantsController(ISQLConnectionFactory sql, TenantsService tenantsService)
        {
            this.sql = sql;
            this.tenantsService = tenantsService;
        }

        /// <summary>
        /// Get a Tenant record
        /// </summary>
        /// <returns>The Tenant record matching the authenticated account</returns>
        [HttpGet("me")]
        public async Task<ActionResult<TenantDto>> GetTenant()
        {
            var id = HttpContext.GetTenantId();
            using (var db = sql.CreateConnection())
            {
                var tenant = await tenantsService.ReadTenant(db, id);
                var result = new TenantDto()
                {
                    Id = tenant.Id,
                    Name = tenant.Name,
                    Accounts = tenant.Accounts.Select(a => new TenantAccountDto { Id = a.Id, Name = a.Name })
                };
                return Ok(result);
            }
        }

        private readonly ISQLConnectionFactory sql;
        private readonly TenantsService tenantsService;
    }
}
