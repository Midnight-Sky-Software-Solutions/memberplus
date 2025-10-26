using MemberPlus.Common;
using MemberPlus.Common.Services;
using MemberPlus.OpenAPI.Filters;
using MemberPlus.OpenAPI.Model.MembershipLevels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/Accounts/{accountId:guid}/[controller]")]
    [ApiController]
    [Authorize]
    [AuthorizeAccount]
    public class MembershipLevelsController(
        ISQLConnectionFactory sql,
        MembershipLevelsService membershipLevelsService) : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<ViewMembershipLevelsDto>> QueryMembershipLevels([FromRoute] Guid accountId)
        {
            using (var db = sql.CreateConnection())
            {
                var result = await membershipLevelsService.QueryMembershipLevels(db, accountId);
                return result.Select(ml => new ViewMembershipLevelsDto()
                {
                    Id = ml.Id,
                    AccountId = accountId,
                    Name = ml.Name,
                    Price = ml.Price,
                    RenewalPeriodCode = ml.RenewalPeriodCode,
                    RenewalPeriodName = ml.RenewalPeriodName,
                });
            }
        }
    }
}
