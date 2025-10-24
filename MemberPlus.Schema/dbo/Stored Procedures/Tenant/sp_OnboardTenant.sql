CREATE PROCEDURE [dbo].[sp_OnboardTenant]
	@TenantId UNIQUEIDENTIFIER,
	@TenantName NVARCHAR(100),
	@ExternalId NVARCHAR(100)
AS
BEGIN

BEGIN TRANSACTION

INSERT INTO dbo.Tenant (
    Id,
    [Name],
    ExternalId
)
VALUES
    (
        @TenantId,
        @TenantName,
        @ExternalId
    );

INSERT INTO dbo.Account (
    Id,
    TenantId,
    [Name]
)
VALUES
    (
        NEWID(),
        @TenantId,
        'Production'
    );

COMMIT TRANSACTION

END