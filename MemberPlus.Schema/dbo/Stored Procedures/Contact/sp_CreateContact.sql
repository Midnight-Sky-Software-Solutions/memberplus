CREATE PROCEDURE [dbo].[sp_CreateContact]
	@AccountId UNIQUEIDENTIFIER,
	@Password NVARCHAR(50),
	@FirstName NVARCHAR(50),
	@LastName NVARCHAR(50),
	@Organization NVARCHAR(50),
	@Email NVARCHAR(50),
	@Phone NVARCHAR(50)
AS

DECLARE @ContactId UNIQUEIDENTIFIER = NEWID();

INSERT INTO dbo.Contact (
	Id,
	AccountId,
	Password,
	FirstName,
	LastName,
	Organization,
	Email,
	Phone
)
VALUES
	(@ContactId, @AccountId, @Password, @FirstName, @LastName, @Organization, @Email, @Phone);

SELECT @ContactId