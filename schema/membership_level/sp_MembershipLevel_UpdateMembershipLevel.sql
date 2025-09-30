CREATE OR ALTER PROCEDURE sp_MembershipLevel_UpdateMembershipLevel
    @AccountId UNIQUEIDENTIFIER,
    @MembershipLevelId UNIQUEIDENTIFIER,
    @Name NVARCHAR(50),
    @Price DECIMAL,
    @RenewalPeriodId INT,
    @Version INT
AS
BEGIN

UPDATE
    dbo.MembershipLevel
SET
    [Name] = @Name,
    Price = @Price,
    RenewalPeriodId = @RenewalPeriodId,
    [Version] = @Version + 1
WHERE
    Id = @MembershipLevelId
    AND AccountId = @AccountId
    AND [Version] = @Version;

END