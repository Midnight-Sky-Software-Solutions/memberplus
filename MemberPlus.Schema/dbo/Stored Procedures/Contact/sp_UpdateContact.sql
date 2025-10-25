CREATE PROCEDURE [dbo].[sp_UpdateContact]
	@Id UNIQUEIDENTIFIER,
	@AccountId UNIQUEIDENTIFIER,
	@Version INT,
	@FirstName NVARCHAR(50),
	@LastName NVARCHAR(50),
	@Organization NVARCHAR(50),
	@Email NVARCHAR(50),
	@Phone NVARCHAR(50)
AS

UPDATE dbo.Contact
SET
	[Version] = @Version + 1,
	FirstName = @FirstName,
	LastName = @LastName,
	Organization = @Organization,
	Email = @Email,
	Phone = @Phone
WHERE
	Id = @Id
	AND AccountId = @AccountId
	AND [Version] = @Version