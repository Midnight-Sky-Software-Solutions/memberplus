CREATE OR ALTER PROCEDURE sp_MembershipLevel_GetMembershipLevel
    @AccountId UNIQUEIDENTIFIER,
    @MembershipLevelId UNIQUEIDENTIFIER
AS
BEGIN

SELECT
    [Id],
    [Version],
    [Name],
    [Price],
    RenewalPeriodId
FROM
    dbo.MembershipLevel
WHERE
    AccountId = @AccountId
    AND Id = @MembershipLevelId;

END