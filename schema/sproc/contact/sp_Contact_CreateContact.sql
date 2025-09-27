CREATE OR ALTER PROCEDURE sp_Contact_CreateContact
    @AccountId UNIQUEIDENTIFIER,
    @FirstName VARCHAR(50),
    @MiddleName VARCHAR(50),
    @LastName VARCHAR(50),
    @DateOfBirth DATE
AS
BEGIN

DECLARE @ContactId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [dbo].[Contact] (
    [Id],
    [Version],
    [AccountId],
    [FirstName],
    [MiddleName],
    [LastName],
    [DateOfBirth])
VALUES
    (@ContactId, 0, @AccountId, @FirstName, @MiddleName, @LastName, @DateOfBirth);

SELECT @ContactId;

END