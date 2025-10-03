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
    [Route("api/Accounts/{accountId:guid}/[controller]")]
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
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
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

        [HttpGet("{membershipLevelId:guid}")]
        public async Task<ReadMembershipLevelDTO> ReadMembershipLevel([FromRoute] Guid accountId, [FromRoute] Guid membershipLevelId)
        {
            var result = await membershipLevelService.GetMembershipLevel(accountId, membershipLevelId);
            return new ReadMembershipLevelDTO()
            {
                Id = result.Id,
                Version = result.Version,
                Name = result.Name,
                Price = result.Price,
                RenewalPeriodId = result.RenewalPeriodId,
            };
        }

        [HttpPut]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateMembershipLevel([FromRoute] Guid accountId, [FromBody] UpdateMembershipLevelDTO request)
        {
            await membershipLevelService.UpdateMembershipLevel(accountId, new Core.Model.MembershipLevel.UpdateMembershipLevel
            {
                Id = request.Id,
                Version = request.Version,
                Name = request.Name,
                Price = request.Price,
                RenewalPeriodId = request.RenewalPeriodId,
            });
            return Ok();
        }

        private readonly MembershipLevelService membershipLevelService;
    }
}
