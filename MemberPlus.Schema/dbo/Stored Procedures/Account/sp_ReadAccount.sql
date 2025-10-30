CREATE PROCEDURE [dbo].[sp_ReadAccount]
	@Id UNIQUEIDENTIFIER
AS

SELECT
	a.[Id],
	a.[Name],
	a.[TenantId],
	a.[ActiveMembers]
FROM
	dbo.vwAccounts a
WHERE
	a.Id = @Id

RETURN 0
