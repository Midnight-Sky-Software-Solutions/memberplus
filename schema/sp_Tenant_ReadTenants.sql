CREATE OR ALTER PROCEDURE sp_Tenant_ReadTenants
AS
BEGIN

SELECT
    Id,
    [Name],
    ExternalId
FROM
    dbo.Tenant

END