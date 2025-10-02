CREATE OR ALTER PROCEDURE sp_Contact_GetContact
    @AccountId UNIQUEIDENTIFIER,
    @ContactId UNIQUEIDENTIFIER
AS
BEGIN

SELECT
    [Id],
    [Version],
    [AccountId],
    [FirstName],
    [MiddleName],
    [LastName],
    [DateOfBirth],
    [MemberStatus],
    [SubscriptionStartDate],
    [SubscriptionEndDate]
FROM
    dbo.vwContacts
WHERE
    ID = @ContactId
    AND AccountId = @AccountId;

END