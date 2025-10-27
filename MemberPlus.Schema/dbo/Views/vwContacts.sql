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
	ms.[Code] [MemberStatusCode],
	ml.[Name] [MembershipLevelName],
	sp.StartDate [SubscriptionStartDate],
	sp.EndDate [SubscriptionEndDate]
FROM 
	[dbo].[Contact] c
	INNER JOIN [dbo].[MemberStatus] ms ON ms.Id = c.MemberStatusId
	LEFT JOIN [dbo].[Subscription] s ON s.ContactId = c.Id AND s.IsActive = 1
	LEFT JOIN (
		SELECT
			MIN(StartDate) [StartDate],
			MAX(EndDate) [EndDate],
			sp.SubscriptionId
		FROM
			dbo.SubscriptionPeriod sp
		GROUP By
			sp.SubscriptionId
	) sp ON sp.SubscriptionId = s.Id
	LEFT JOIN dbo.MembershipLevel ml ON ml.Id = s.MembershipLevelId