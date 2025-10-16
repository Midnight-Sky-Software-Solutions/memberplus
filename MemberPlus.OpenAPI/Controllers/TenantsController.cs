using MemberPlus.Common;
using MemberPlus.Common.Services;
using MemberPlus.OpenAPI.Model.Tenants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        /// <param name="id">Id of the Tenant</param>
        /// <returns>The Tenant record matching the provided Id</returns>
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<TenantDto>> GetTenant([FromRoute] Guid id)
        {
            using (var db = sql.CreateConnection())
            {
                var result = await tenantsService.ReadTenant(db, id);
                return Ok(result);
            }
        }

        private readonly ISQLConnectionFactory sql;
        private readonly TenantsService tenantsService;
    }
}
