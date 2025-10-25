CREATE PROCEDURE [dbo].[sp_ReadContact]
	@AccountId UNIQUEIDENTIFIER,
	@Id UNIQUEIDENTIFIER
AS
SELECT
	Id,
	AccountId,
	FirstName,
	LastName,
	Email,
	LastLogin,
	[Membership],
	[Events],
	[Donations],
	[Balance]
FROM 
	[dbo].[vwContacts] c
WHERE
	c.AccountId = @AccountId
	AND c.Id = @Id