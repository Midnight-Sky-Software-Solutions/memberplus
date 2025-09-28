CREATE OR ALTER VIEW vwContacts
AS
SELECT
    ID,
    [FirstName],
    [MiddleName],
    [LastName],
    [DateOfBirth],
    [AccountId]
FROM
    dbo.Contact;