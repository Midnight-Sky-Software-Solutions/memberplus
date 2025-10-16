CREATE TABLE [dbo].[Subscription] (
    [Id]                INT              NOT NULL,
    [ContactId]         UNIQUEIDENTIFIER NOT NULL,
    [MembershipLevelId] UNIQUEIDENTIFIER NOT NULL,
    [Version]           INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id]),
    FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id]),
    FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id]),
    FOREIGN KEY ([MembershipLevelId]) REFERENCES [dbo].[MembershipLevel] ([Id]),
    FOREIGN KEY ([MembershipLevelId]) REFERENCES [dbo].[MembershipLevel] ([Id]),
    FOREIGN KEY ([MembershipLevelId]) REFERENCES [dbo].[MembershipLevel] ([Id])
);

