CREATE PROCEDURE sp_AuthorizeAccountForTenant
    @TenantId UNIQUEIDENTIFIER,
    @AccountId UNIQUEIDENTIFIER
AS
BEGIN

SELECT
    CASE WHEN EXISTS (
        SELECT 1
        FROM
            dbo.Account
        WHERE
            TenantId = @TenantId
            AND Id = @AccountId
    ) THEN 1
    ELSE 0
END [Authorize]

END