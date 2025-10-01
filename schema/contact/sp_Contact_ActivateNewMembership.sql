CREATE OR ALTER PROCEDURE sp_Contact_ActivateNewMembership
    @ContactId UNIQUEIDENTIFIER,
    @AccountId UNIQUEIDENTIFIER,
    @MembershipLevelId UNIQUEIDENTIFIER,
    @StartDate DATETIMEOFFSET
AS
BEGIN

BEGIN TRANSACTION

IF NOT EXISTS (
    SELECT 1
    FROM
        dbo.Contact
    WHERE
        Id = @ContactId
        AND AccountId = @AccountId
)
THROW 50404, 'Not Found', 1;

IF NOT EXISTS (
    SELECT 1
    FROM
        dbo.MembershipLevel
    WHERE
        Id = @MembershipLevelId
        AND AccountId = @AccountId
)
THROW 50404, 'Not Found', 1;


INSERT INTO dbo.Subscription (
    ContactId,
    MembershipLevelId,
    Active
)
VALUES
    (
        @ContactId,
        @MembershipLevelId,
        1
    );

DECLARE @SubscriptionId INT = SCOPE_IDENTITY();

DECLARE @InvoiceId UNIQUEIDENTIFIER = NEWID();

INSERT INTO dbo.Invoice (
    Id,
    ContactId,
    Amount
)
VALUES
    (
        @InvoiceId,
        @ContactId,
        (SELECT Price FROM dbo.MembershipLevel WHERE Id = @MembershipLevelId)
    )

INSERT INTO dbo.SubscriptionPurchase (
    SubscriptionId,
    InvoiceId,
    StartDate,
    EndDate
)
VALUES (
    @SubscriptionId,
    @InvoiceId,
    @StartDate,
    CASE (SELECT [Name] FROM dbo.RenewalPeriod WHERE ID = (SELECT RenewalPeriodID FROM dbo.MembershipLevel WHERE ID = @MembershipLevelId))
        WHEN 'Monthly'
            THEN DATEADD(DAY, -1, DATEADD(MONTH, 1, @StartDate))
        WHEN 'Quarterly'
            THEN DATEADD(DAY, -1, DATEADD(MONTH, 3, @StartDate))
        WHEN 'Twice a year'
            THEN DATEADD(DAY, -1, DATEADD(MONTH, 6, @StartDate))
        WHEN 'Every year'
            THEN DATEADD(DAY, -1, DATEADD(YEAR, 1, @StartDate))
    END
);

UPDATE dbo.Contact
SET
    MemberStatusId = (SELECT ID FROM dbo.MemberStatusType WHERE [Name] = 'Active')
WHERE
    ID = @ContactId;

COMMIT TRANSACTION
END