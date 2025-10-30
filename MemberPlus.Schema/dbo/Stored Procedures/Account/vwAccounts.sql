CREATE VIEW [dbo].[vwAccounts]
AS
SELECT
	a.[Id],
	a.[Name],
	a.[TenantId],
	(
		SELECT COUNT(*)
		FROM
			dbo.Contact c
		WHERE
			c.AccountId = a.Id
			AND c.MemberStatusId = (SELECT ID FROM dbo.MemberStatus WHERE [Code] = 'MS02')
	) [ActiveMembers]
FROM
	dbo.Account a