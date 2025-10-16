CREATE TABLE [dbo].[Account] (
    [Id]       UNIQUEIDENTIFIER NOT NULL,
    [TenantId] UNIQUEIDENTIFIER NOT NULL,
    [Name]     NVARCHAR (100)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    FOREIGN KEY ([TenantId]) REFERENCES [dbo].[Tenant] ([Id]),
    FOREIGN KEY ([TenantId]) REFERENCES [dbo].[Tenant] ([Id])
);

