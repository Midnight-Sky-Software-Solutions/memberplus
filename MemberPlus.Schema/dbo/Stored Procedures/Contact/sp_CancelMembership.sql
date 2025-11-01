CREATE PROCEDURE [dbo].[sp_CancelMembership]
    @ContactId UNIQUEIDENTIFIER,
    @AccountId UNIQUEIDENTIFIER
AS
BEGIN

UPDATE dbo.Contact
SET
    MemberStatusId = (SELECT Id FROM dbo.MemberStatus WHERE [Code] = 'MS05')
WHERE
    ID = @ContactId
    AND AccountId = @AccountId
    AND MemberStatusId = (SELECT Id FROM dbo.MemberStatus WHERE [Code] = 'MS02');

END