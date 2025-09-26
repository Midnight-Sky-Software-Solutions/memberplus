CREATE OR ALTER PROCEDURE sp_Account_CreateAccount
    @Id UNIQUEIDENTIFIER,
    @TenantId UNIQUEIDENTIFIER,
    @Name NVARCHAR(100)
AS
BEGIN

INSERT INTO dbo.Account (
    Id,
    TenantId,
    Name
)
VALUES
    (@Id, @TenantId, @Name)
;

END