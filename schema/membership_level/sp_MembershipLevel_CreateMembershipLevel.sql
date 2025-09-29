CREATE OR ALTER PROCEDURE sp_MembershipLevel_CreateMembershipLevel
    @AccountId UNIQUEIDENTIFIER,
    @Name VARCHAR(50),
    @Price DECIMAL,
    @RenewalPeriodId INT
AS
BEGIN

DECLARE @MembershipLevelId UNIQUEIDENTIFIER = NEWID();

INSERT INTO [dbo].[MembershipLevel] (
    [Id],
    [AccountId],
    [Name],
    [Price],
    [RenewalPeriodId]
)
VALUES
    (@MembershipLevelId,
     @AccountId,
     @Name,
     @Price,
     @RenewalPeriodId);


SELECT @MembershipLevelId [MembershipLevelId]

END