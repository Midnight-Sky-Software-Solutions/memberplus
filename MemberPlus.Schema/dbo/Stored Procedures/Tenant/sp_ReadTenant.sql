CREATE PROCEDURE sp_ReadTenant
    @Id UNIQUEIDENTIFIER
AS
BEGIN

SELECT
    [Id],
    [Name]
FROM
    dbo.Tenant
WHERE
    Id = @Id;

SELECT
    [Id],
    [Name]
FROM
    dbo.Account
WHERE
    TenantId = @Id;

END