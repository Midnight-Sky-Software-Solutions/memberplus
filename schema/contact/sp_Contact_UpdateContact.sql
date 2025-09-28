CREATE OR ALTER PROCEDURE sp_Contact_UpdateContact
    @AccountId UNIQUEIDENTIFIER,
    @ContactId UNIQUEIDENTIFIER,
    @Version INT,
    @FirstName VARCHAR(50),
    @MiddleName VARCHAR(50),
    @LastName VARCHAR(50),
    @DateOfBirth DATE
AS
BEGIN

UPDATE [dbo].[Contact]
SET
    FirstName = @FirstName,
    MiddleName = @MiddleName,
    LastName = @LastName,
    DateOfBirth = @DateOfBirth
WHERE
    AccountId = @AccountId
    AND Id = @ContactId
    AND [Version] = @Version

END