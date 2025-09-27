CREATE OR ALTER PROCEDURE sp_AdminDashboard_ReadDashboard
    @TenantId UNIQUEIDENTIFIER
AS
BEGIN

SELECT
    t.[Name] [TenantName],
    (
        SELECT TOP 1 ID
        FROM
            dbo.Account
        WHERE
            TenantId = @TenantId
    ) [AccountId]
FROM
    dbo.Tenant t
WHERE
    t.Id = @TenantId

END