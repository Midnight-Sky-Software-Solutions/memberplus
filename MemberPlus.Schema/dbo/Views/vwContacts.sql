CREATE VIEW [dbo].[vwContacts]
AS
SELECT
	c.Id,
	c.AccountId,
	c.FirstName,
	c.LastName,
	c.Organization,
	c.[Version],
	c.Email,
	c.Phone,
	c.LastLogin,
	c.DateUpdated,
	NULL [Membership],
	NULL [Events],
	NULL [Donations],
	0.0 [Balance],
	ms.[Name] [MemberStatusName],
	ms.[Code] [MemberStatusCode]
FROM 
	[dbo].[Contact] c
	INNER JOIN [dbo].[MemberStatus] ms ON ms.Id = c.MemberStatusId