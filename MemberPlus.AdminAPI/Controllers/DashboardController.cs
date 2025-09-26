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
                var tenantId = Guid.Parse("A710C9B8-C3A1-4951-A63C-7858683B15E7"); // TODO: get this from auth token
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
