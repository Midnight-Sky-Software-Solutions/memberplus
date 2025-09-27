CREATE VIEW vwContacts
AS
SELECT
    [FirstName],
    [MiddleName],
    [LastName],
    [DateOfBirth],
    [AccountId]
FROM
    dbo.Contact;