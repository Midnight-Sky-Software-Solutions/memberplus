CREATE PROCEDURE [dbo].[sp_CancelMembership]
    @ContactId UNIQUEIDENTIFIER,
    @AccountId UNIQUEIDENTIFIER
AS
BEGIN

BEGIN TRANSACTION

UPDATE dbo.Subscription
SET
    IsActive = 0
WHERE
    ContactId = @ContactId
    AND ContactId IN (
        SELECT Id
        FROM dbo.Contact
        WHERE
            AccountId = @AccountId
    )

UPDATE dbo.Contact
SET
    MemberStatusId = (SELECT Id FROM dbo.MemberStatus WHERE [Code] = 'MS05')
WHERE
    ID = @ContactId
    AND AccountId = @AccountId
    AND MemberStatusId = (SELECT Id FROM dbo.MemberStatus WHERE [Code] = 'MS02');

COMMIT TRANSACTION

END