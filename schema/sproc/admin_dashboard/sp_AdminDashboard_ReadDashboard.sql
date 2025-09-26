CREATE OR ALTER PROCEDURE sp_AdminDashboard_ReadDashboard
    @TenantId UNIQUEIDENTIFIER
AS
BEGIN

SELECT
    t.[Name] [TenantName]
FROM
    dbo.Tenant t
WHERE
    t.Id = @TenantId

END