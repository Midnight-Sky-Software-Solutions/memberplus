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

        private ContactService contactService;
    }
}
