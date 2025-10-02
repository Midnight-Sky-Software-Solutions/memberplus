CREATE OR ALTER VIEW vwContacts
AS
SELECT
    c.ID,
    c.[FirstName],
    c.[MiddleName],
    c.[LastName],
    c.[DateOfBirth],
    mst.[Name] [MemberStatus],
    c.[Version],
    c.[AccountId]
FROM
    dbo.Contact c
    LEFT JOIN dbo.MemberStatusType mst ON mst.Id = c.MemberStatusId