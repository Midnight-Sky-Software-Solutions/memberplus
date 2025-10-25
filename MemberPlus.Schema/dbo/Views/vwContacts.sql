CREATE VIEW [dbo].[vwContacts]
AS
SELECT
	Id,
	AccountId,
	FirstName,
	LastName,
	Email,
	LastLogin,
	DateUpdated,
	NULL [Membership],
	NULL [Events],
	NULL [Donations],
	0.0 [Balance]
FROM 
	[dbo].[Contact]
