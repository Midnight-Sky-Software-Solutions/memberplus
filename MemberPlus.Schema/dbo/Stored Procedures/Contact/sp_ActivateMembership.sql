CREATE PROCEDURE [dbo].[sp_ActivateMembership]
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
    IsActive
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

INSERT INTO dbo.SubscriptionPeriod (
    SubscriptionId,
    InvoiceId,
    StartDate,
    EndDate
)
VALUES (
    @SubscriptionId,
    @InvoiceId,
    @StartDate,
    CASE (SELECT [Code] FROM dbo.RenewalPeriod WHERE ID = (SELECT RenewalPeriodID FROM dbo.MembershipLevel WHERE ID = @MembershipLevelId))
        WHEN 'RPM'
            THEN DATEADD(DAY, -1, DATEADD(MONTH, 1, @StartDate))
        WHEN 'RPQ'
            THEN DATEADD(DAY, -1, DATEADD(MONTH, 3, @StartDate))
        WHEN 'RPT'
            THEN DATEADD(DAY, -1, DATEADD(MONTH, 6, @StartDate))
        WHEN 'RPA'
            THEN DATEADD(DAY, -1, DATEADD(YEAR, 1, @StartDate))
    END
);

UPDATE dbo.Contact
SET
    MemberStatusId = (SELECT Id FROM dbo.MemberStatus WHERE [Code] = 'MS02')
WHERE
    ID = @ContactId;

COMMIT TRANSACTION
END