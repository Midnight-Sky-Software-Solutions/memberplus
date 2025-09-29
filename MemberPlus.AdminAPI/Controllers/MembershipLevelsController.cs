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

        [HttpGet]
        public async Task<IEnumerable<ViewMembershipLevelsDTO>> QueryMembershipLevels([FromRoute] Guid accountId)
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
