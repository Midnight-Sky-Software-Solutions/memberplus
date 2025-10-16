CREATE TABLE [dbo].[MembershipLevel] (
    [Id]              UNIQUEIDENTIFIER NOT NULL,
    [AccountId]       UNIQUEIDENTIFIER NOT NULL,
    [Name]            NVARCHAR (50)    NOT NULL,
    [Price]           DECIMAL (18)     NOT NULL,
    [RenewalPeriodId] INT              NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
    FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
    FOREIGN KEY ([RenewalPeriodId]) REFERENCES [dbo].[RenewalPeriod] ([Id]),
    FOREIGN KEY ([RenewalPeriodId]) REFERENCES [dbo].[RenewalPeriod] ([Id]),
    FOREIGN KEY ([RenewalPeriodId]) REFERENCES [dbo].[RenewalPeriod] ([Id])
);

