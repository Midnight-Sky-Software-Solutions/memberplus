CREATE TABLE [dbo].[SubscriptionPeriod] (
    [Id]             INT                IDENTITY(1,1) NOT NULL,
    [SubscriptionId] INT                NOT NULL,
    [InvoiceId]      UNIQUEIDENTIFIER   NOT NULL,
    [StartDate]      DATETIMEOFFSET (7) NOT NULL,
    [EndDate]        DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[Invoice] ([Id]),
    FOREIGN KEY ([SubscriptionId]) REFERENCES [dbo].[Subscription] ([Id]),
    FOREIGN KEY ([SubscriptionId]) REFERENCES [dbo].[Subscription] ([Id]),
    FOREIGN KEY ([SubscriptionId]) REFERENCES [dbo].[Subscription] ([Id])
);

