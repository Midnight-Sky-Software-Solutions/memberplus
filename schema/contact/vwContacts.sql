CREATE OR ALTER VIEW vwContacts
AS
SELECT
    c.ID,
    c.[FirstName],
    c.[MiddleName],
    c.[LastName],
    c.[DateOfBirth],
    mst.[Name] [MemberStatus],
    c.[Version],
    c.[AccountId],
    sp.StartDate [SubscriptionStartDate],
    sp.EndDate [SubscriptionEndDate]
FROM
    dbo.Contact c
    LEFT JOIN dbo.MemberStatusType mst ON mst.Id = c.MemberStatusId
    LEFT JOIN dbo.Subscription s ON s.ContactId = c.Id
    LEFT JOIN dbo.SubscriptionPurchase sp ON sp.ID = (
        SELECT TOP 1 ID
        FROM
            dbo.SubscriptionPurchase sp2
        WHERE
            sp2.SubscriptionId = s.Id
        ORDER BY EndDate DESC
    )