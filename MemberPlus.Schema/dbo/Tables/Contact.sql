CREATE TABLE [dbo].[Contact] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [AccountId]  UNIQUEIDENTIFIER NOT NULL,
    [FirstName]  NVARCHAR (50)    NOT NULL,
    [MiddleName] NVARCHAR (50)    NULL,
    [LastName]   NVARCHAR (50)    NOT NULL,
    [Version]    INT              NULL,
    [Password] NVARCHAR(50) NULL, 
    [Organization] NVARCHAR(50) NULL, 
    [Email] NVARCHAR(50) NOT NULL, 
    [Phone] NVARCHAR(50) NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id]),
    FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Account] ([Id])
);

