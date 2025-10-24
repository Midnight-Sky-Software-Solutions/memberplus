using MemberPlus.Common;
using MemberPlus.OpenAPI.Model.Contacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/Accounts/{accountId:guid}/[controller]")]
    [ApiController]
    public class ContactsController(
        ISQLConnectionFactory sql) : ControllerBase
    {
        [HttpPost]
        public async Task<Guid> CreateContact(CreateContactDto request)
        {
            return Guid.NewGuid();
        }
    }
}
