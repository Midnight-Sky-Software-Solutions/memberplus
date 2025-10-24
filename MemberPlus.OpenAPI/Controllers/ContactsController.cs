using MemberPlus.Common;
using MemberPlus.Common.Services;
using MemberPlus.OpenAPI.Model.Contacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/Accounts/{accountId:guid}/[controller]")]
    [ApiController]
    public class ContactsController(
        ISQLConnectionFactory sql,
        ContactsService contactsService) : ControllerBase
    {
        [HttpPost]
        public async Task<Guid> CreateContact([FromRoute] Guid accountId, [FromBody] CreateContactDto request)
        {
            using (var db = sql.CreateConnection())
            {
                return await contactsService.CreateContact(db, new Common.Model.Contacts.CreateContact
                {
                    AccountId = accountId,
                    Password = request.Password,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Organization = request.Organization,
                    Email = request.Email,
                    Phone = request.Phone,
                });
            }
        }
    }
}
