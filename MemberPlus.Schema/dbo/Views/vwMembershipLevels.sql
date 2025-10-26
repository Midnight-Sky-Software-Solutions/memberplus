CREATE VIEW [dbo].[vwMembershipLevels]
AS 
SELECT
    ml.[Id],
    ml.[AccountId],
    ml.[Name],
    ml.[Price],
    ml.[RenewalPeriodId],
    rp.[Name] [RenewalPeriodName],
    rp.[Code] [RenewalPeriodCode]
FROM 
    [dbo].[MembershipLevel] ml
    INNER JOIN dbo.RenewalPeriod rp ON ml.RenewalPeriodId = rp.Id