CREATE OR ALTER PROCEDURE sp_Tenant_ReadTenant
    @TenantId UNIQUEIDENTIFIER
AS
BEGIN

SELECT
    Id,
    [Name],
    ExternalId
FROM
    dbo.Tenant
WHERE
    Id = @TenantId

END