CREATE OR ALTER PROCEDURE sp_Tenant_CreateTenant 
    @Id UNIQUEIDENTIFIER, 
    @Name VARCHAR(100), 
    @ExternalId VARCHAR(100)
AS
BEGIN

INSERT INTO dbo.Tenant (
    Id,
    [Name],
    ExternalId
)
VALUES
(
    @Id,
    @Name,
    @ExternalId
);

END