CREATE OR ALTER PROCEDURE sp_Tenant_UpdateTenant 
    @Id UNIQUEIDENTIFIER, 
    @Name VARCHAR(100), 
    @ExternalId VARCHAR(100)
AS
BEGIN

UPDATE dbo.Tenant
SET
    [Name] = @Name,
    ExternalId = @ExternalId
WHERE
    Id = @Id;

END