CREATE OR ALTER PROCEDURE sp_Contact_DeleteContact
    @AccountId UNIQUEIDENTIFIER,
    @ContactId UNIQUEIDENTIFIER
AS
BEGIN

DELETE FROM dbo.Contact
WHERE 
    ID = @ContactId
    AND AccountId = @AccountId;

END