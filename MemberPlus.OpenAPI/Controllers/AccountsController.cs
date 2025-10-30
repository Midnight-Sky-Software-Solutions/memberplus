using MemberPlus.Common;
using MemberPlus.Common.Services;
using MemberPlus.OpenAPI.Filters;
using MemberPlus.OpenAPI.Model.Accounts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController(
        ISQLConnectionFactory sql,
        AccountsService accountsService) : ControllerBase
    {
        [HttpGet("{accountId:guid}")]
        [AuthorizeAccount]
        public async Task<ReadAccountDto> ReadAccounts([FromRoute] Guid accountId)
        {
            using (var db = sql.CreateConnection())
            {
                var result = await accountsService.ReadAccount(db, accountId);
                return new ReadAccountDto()
                {
                    Id = result.Id,
                    TenantId = result.TenantId,
                    Name = result.Name,
                    ActiveMembers = result.ActiveMembers,
                };
            }
        }
    }
}
