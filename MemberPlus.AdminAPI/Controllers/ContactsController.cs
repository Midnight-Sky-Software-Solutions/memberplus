using MemberPlus.AdminAPI.DTO.Contact;
using MemberPlus.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.AdminAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContactsController : ControllerBase
    {
        public ContactsController(ContactService contactService)
        {
            this.contactService = contactService;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateContact(CreateContactDTO request)
        {
            return await contactService.CreateContact(new Core.Model.Contact.CreateContact
            {
                AccountId = request.AccountId,
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
            });
        }

        [HttpGet]
        public async Task<IEnumerable<ViewContactsDTO>> QueryContacts([FromQuery]Guid accountId)
        {
            return (await contactService.QueryContacts(accountId)).Select(conact => new ViewContactsDTO
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
