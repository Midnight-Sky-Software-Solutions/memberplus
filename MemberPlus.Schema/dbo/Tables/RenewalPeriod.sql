CREATE TABLE [dbo].[RenewalPeriod] (
    [Id]   INT           NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    [Code] VARCHAR (10)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    UNIQUE NONCLUSTERED ([Code] ASC)
);

