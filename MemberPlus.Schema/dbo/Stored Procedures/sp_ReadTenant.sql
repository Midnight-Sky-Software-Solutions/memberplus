CREATE   PROCEDURE sp_ReadTenant
    @Id UNIQUEIDENTIFIER
AS
SELECT
    [Id],
    [Name]
FROM
    dbo.Tenant
WHERE
    Id = @Id;