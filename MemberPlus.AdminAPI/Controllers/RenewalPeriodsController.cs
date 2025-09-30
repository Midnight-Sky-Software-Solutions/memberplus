using MemberPlus.AdminAPI.DTO.RenewalPeriod;
using MemberPlus.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.AdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RenewalPeriodsController : ControllerBase
    {
        public RenewalPeriodsController(RenewalPeriodService renewalPeriodService)
        {
            this.renewalPeriodService = renewalPeriodService;
        }

        [HttpGet]
        public async Task<IEnumerable<RenewalPeriodDTO>> QueryRenewalPeriods()
        {
            var result = await renewalPeriodService.QueryRenewalPeriods();
            return result.Select(renewalPeriod => new RenewalPeriodDTO()
            {
                Id = renewalPeriod.Id,
                Name = renewalPeriod.Name,
            });
        }

        private readonly RenewalPeriodService renewalPeriodService;
    }
}
