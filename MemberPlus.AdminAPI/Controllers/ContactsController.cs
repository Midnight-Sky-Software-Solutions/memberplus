using MemberPlus.AdminAPI.DTO.Contact;
using MemberPlus.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace MemberPlus.AdminAPI.Controllers
{
    [Route("api/accounts/{accountId:guid}/[controller]/")]
    [ApiController]
    [Authorize]
    [AuthorizeAccount]
    public class ContactsController : ControllerBase
    {
        public ContactsController(ContactService contactService)
        {
            this.contactService = contactService;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateContact([FromRoute]Guid accountId, CreateContactDTO request)
        {
            return await contactService.CreateContact(new Core.Model.Contact.CreateContact
            {
                AccountId = accountId,
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
            });
        }

        [HttpGet]
        public async Task<IEnumerable<ViewContactsDTO>> QueryContacts([FromRoute]Guid accountId, [FromQuery]string? searchTerm)
        {
            return (await contactService.QueryContacts(accountId, searchTerm)).Select(conact => new ViewContactsDTO
            {
                FirstName = conact.FirstName,
                MiddleName = conact.MiddleName,
                LastName = conact.LastName,
                DateOfBirth = conact.DateOfBirth,
            });
        }

        private ContactService contactService;
    }
}
