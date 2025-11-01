using MemberPlus.Common;
using MemberPlus.Common.Services;
using MemberPlus.OpenAPI.Filters;
using MemberPlus.OpenAPI.Model;
using MemberPlus.OpenAPI.Model.Contacts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MemberPlus.OpenAPI.Controllers
{
    [Route("api/Accounts/{accountId:guid}/[controller]")]
    [ApiController]
    [Authorize]
    [AuthorizeAccount]
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

        [HttpGet]
        public async Task<PaginatedResult<ViewContactsDto>> QueryContacts(
            [FromRoute] Guid accountId, [FromQuery] int perPage, [FromQuery] int pageNumber,
            [FromQuery] string? searchTerm)
        {
            using (var db = sql.CreateConnection())
            {
                var result = await contactsService.QueryContacts(db, accountId, perPage, pageNumber, searchTerm);
                return new PaginatedResult<ViewContactsDto>()
                {
                    TotalRecords = result.TotalRecords,
                    Items = result.Items.Select(item => new ViewContactsDto()
                    {
                        Id = item.Id,
                        AccountId = item.AccountId,
                        FirstName = item.FirstName,
                        LastName = item.LastName,
                        Email = item.Email,
                        Membership = item.Membership,
                        Events = item.Events,
                        Donations = item.Donations,
                        Balance = item.Balance,
                        MemberStatusCode = item.MemberStatusCode,
                        MemberStatusName = item.MemberStatusName,
                    })
                };
            }
        }

        [HttpGet("{id:guid}")]
        public async Task<ReadContactDto> ReadContact(
            [FromRoute] Guid accountId, [FromRoute] Guid id)
        {
            using (var db = sql.CreateConnection())
            {
                var result = await contactsService.ReadContact(db, accountId, id);
                return new ReadContactDto
                {
                    Version = result.Version,
                    Id = result.Id,
                    AccountId = result.AccountId,
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Organization = result.Organization,
                    Email = result.Email,
                    Phone = result.Phone,
                    LastLogin = result.LastLogin,
                    DateUpdated = result.DateUpdated,
                    Membership = result.Membership,
                    Events = result.Events,
                    Donations = result.Donations,
                    Balance = result.Balance,
                    MemberStatusName = result.MemberStatusName,
                    MemberStatusCode = result.MemberStatusCode,
                    MembershipLevelName = result.MembershipLevelName,
                    SubscriptionStartDate = result.SubscriptionStartDate,
                    SubscriptionEndDate = result.SubscriptionEndDate,
                };
            }
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> UpdateContact(
            [FromRoute] Guid accountId, [FromRoute] Guid id, [FromBody] UpdateContactDto request)
        {
            using (var db = sql.CreateConnection())
            {
                await contactsService.UpdateContact(db, new Common.Model.Contacts.UpdateContact()
                {
                    Version = request.Version,
                    Id = id,
                    AccountId = accountId,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Organization = request.Organization,
                    Email = request.Email,
                    Phone = request.Phone,
                });
            }
            return Created();
        }

        [HttpPost("{id:guid}/membership")]
        public async Task<ActionResult> ActivateMembership([FromRoute] Guid accountId, [FromRoute] Guid id, [FromBody] ActivateMembershipDto request)
        {
            using (var db = sql.CreateConnection())
            {
                await contactsService.ActivateMembership(db, new Common.Model.Contacts.ActivateMembership()
                {
                    AccountId = accountId,
                    ContactId = id,
                    MembershipLevelId = request.MembershipLevelId,
                    StartDate = request.StartDate
                });
            }
            return Created();
        }

        [HttpDelete("{id:guid}/membership")]
        public async Task<ActionResult> CancelMembership([FromRoute] Guid accountId, [FromRoute] Guid id)
        {
            using (var db = sql.CreateConnection())
            {
                await contactsService.CancelMembership(db, new Common.Model.Contacts.CancelMembership()
                {
                    AccountId = accountId,
                    ContactId = id,
                });
            }
            return NoContent();
        }
    }
}
