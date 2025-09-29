using MemberPlus.AdminAPI.DTO;
using MemberPlus.AdminAPI.DTO.Contact;
using MemberPlus.AdminAPI.DTO.MembershipLevel;
using MemberPlus.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace MemberPlus.AdminAPI.Controllers
{
    [Route("api/accounts/{accountId:guid}/[controller]")]
    [ApiController]
    [Authorize]
    [AuthorizeAccount]
    public class MembershipLevelsController : ControllerBase
    {
        public MembershipLevelsController(MembershipLevelService membershipLevelService) 
        { 
            this.membershipLevelService = membershipLevelService;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateMembershipLevel([FromRoute]Guid accountId, CreateMembershipLevelDTO request)
        {
            return await membershipLevelService.CreateMembershipLevel(new Core.Model.MembershipLevel.CreateMembershipLevel
            {
                AccountId = accountId,
                Name = request.Name,
                Price = request.Price,
                RenewalPeriodId = request.RenewalPeriodId,
            });
        }

        [HttpGet]
        public async Task<IEnumerable<ViewMembershipLevelsDTO>> QueryMembershipLevels([FromRoute]Guid accountId)
        {
            var result = await membershipLevelService.QueryMembershipLevels(accountId);
            return result.Select(membershipLevel => new ViewMembershipLevelsDTO
            {
                Id = membershipLevel.Id,
                Name = membershipLevel.Name,
                Price = membershipLevel.Price,
                RenewalPeriod = membershipLevel.RenewalPeriod
            });
        }

        private readonly MembershipLevelService membershipLevelService;
    }
}
