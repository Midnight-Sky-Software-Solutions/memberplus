CREATE TABLE [dbo].[Invoice] (
    [Id]        UNIQUEIDENTIFIER NOT NULL,
    [ContactId] UNIQUEIDENTIFIER NOT NULL,
    [Amount]    DECIMAL (18)     NOT NULL,
    [Version]   INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([ContactId]) REFERENCES [dbo].[Contact] ([Id])
);

