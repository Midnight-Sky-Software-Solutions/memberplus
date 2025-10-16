CREATE TABLE [dbo].[Tenant] (
    [Id]         UNIQUEIDENTIFIER NOT NULL,
    [Name]       NVARCHAR (100)   NOT NULL,
    [ExternalId] NVARCHAR (100)   NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

