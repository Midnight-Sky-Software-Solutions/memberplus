CREATE OR ALTER VIEW vwMembershipLevels
AS
SELECT
    ml.Id,
    ml.AccountId,
    ml.[Name],
    ml.[Price],
    rp.[Name] [RenewalPeriod]
FROM
    dbo.MembershipLevel ml
    INNER JOIN
        dbo.RenewalPeriod rp ON rp.Id = ml.RenewalPeriodId;