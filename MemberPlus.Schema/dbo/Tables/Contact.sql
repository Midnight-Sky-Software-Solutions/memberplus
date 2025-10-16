CREATE TABLE [dbo].[Contact] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [AccountId]  UNIQUEIDENTIFIER NOT NULL,
    [StatusId]   INT              NOT NULL,
    [FirstName]  NVARCHAR (50)    NOT NULL,
    [MiddleName] NVARCHAR (50)    NULL,
    [LastName]   NVARCHAR (50)    NOT NULL,
    [Version]    INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
    FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
    FOREIGN KEY ([StatusId]) REFERENCES [dbo].[MemberStatus] ([Id]),
    FOREIGN KEY ([StatusId]) REFERENCES [dbo].[MemberStatus] ([Id]),
    FOREIGN KEY ([StatusId]) REFERENCES [dbo].[MemberStatus] ([Id])
);

