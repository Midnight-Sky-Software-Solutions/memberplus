using MemberPlus.AdminAPI.DTO;
using MemberPlus.AdminAPI.DTO.Contact;
using MemberPlus.Core.Model.Contact;
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
        public async Task<PaginatedResultDTO<ViewContactsDTO>> QueryContacts(
            [FromRoute]Guid accountId, [FromQuery]int perPage, [FromQuery]int pageNumber, 
            [FromQuery]string? searchTerm, [FromQuery]int? sortOrder, [FromQuery]string sortField = "id")
        {
            var result = await contactService.QueryContacts(accountId, perPage, pageNumber, searchTerm, sortOrder, sortField);
            return new PaginatedResultDTO<ViewContactsDTO>()
            {
                TotalRecords = result.TotalRecords,
                Items = result.Items.Select(contact => new ViewContactsDTO
                {
                    Id = contact.Id,
                    FirstName = contact.FirstName,
                    MiddleName = contact.MiddleName,
                    LastName = contact.LastName,
                    MemberStatus = contact.MemberStatus,
                    DateOfBirth = contact.DateOfBirth,
                })
            };
        }

        [HttpGet("{contactId:guid}")]
        public async Task<ActionResult<ReadContactDTO>> ReadContact([FromRoute]Guid accountId, [FromRoute]Guid contactId)
        {
            var result = await contactService.ReadContact(accountId, contactId);
            return new ReadContactDTO()
            {
                Id = result.Id,
                Version = result.Version,
                FirstName = result.FirstName,
                MiddleName= result.MiddleName,
                LastName = result.LastName,
                DateOfBirth = result.DateOfBirth,
                MemberStatus= result.MemberStatus,
                SubscriptionStartDate = result.SubscriptionStartDate,
                SubscriptionEndDate = result.SubscriptionEndDate,
            };
        }

        [HttpPut]
        public async Task<ActionResult> UpdateContant([FromRoute]Guid accountId, [FromBody]UpdateContactDTO request)
        {
            await contactService.UpdateContact(accountId, new Core.Model.Contact.UpdateContact
            {
                Id = request.Id,
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
                Version = request.Version
            });
            return Ok();
        }

        [HttpDelete("{contactId:guid}")]
        public async Task<ActionResult> DeleteContact([FromRoute]Guid accountId, [FromRoute]Guid contactId)
        {
            await contactService.DeleteContact(accountId, contactId);
            return Ok();
        }

        [HttpPost("{contactId:guid}/membership")]
        public async Task<ActionResult> ActivateMembership([FromRoute] Guid accountId, [FromRoute] Guid contactId, 
            [FromBody] ActivateMembershipDTO request)
        {
            await contactService.ActivateMembership(new Core.Model.Contact.ActivateMembership
            {
                ContactId = contactId,
                AccountId = accountId,
                MembershipLevelId = request.MembershipLevelId,
                StartDate = request.StartDate,
            });
            return Created();
        }

        private ContactService contactService;
    }
}
