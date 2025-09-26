using MemberPlus.AdminAPI.DTO.Dashboard;
using MemberPlus.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.AdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        public DashboardController(AdminDashboardService adminDashboardService) 
        { 
            this.adminDashboardService = adminDashboardService;
        }

        [HttpGet]
        public async Task<ActionResult<DashboardDTO>> ReadDashboard()
        {
            try
            {
                var tenantId = HttpContext.GetTenantId();
                var dashboard = await adminDashboardService.ReadDashboard(tenantId);
                return new DashboardDTO()
                {
                    TenantName = dashboard.TenantName,
                };
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        private readonly AdminDashboardService adminDashboardService;
    }
}
