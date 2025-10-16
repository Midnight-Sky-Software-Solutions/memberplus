CREATE TABLE [Tenant] (
  [Id] uniqueidentifier PRIMARY KEY,
  [Name] nvarchar(100) NOT NULL,
  [ExternalId] nvarchar(100) NOT NULL
)
GO

CREATE TABLE [Account] (
  [Id] uniqueidentifier PRIMARY KEY,
  [TenantId] uniqueidentifier NOT NULL,
  [Name] nvarchar(100) NOT NULL
)
GO

CREATE TABLE [Contact] (
  [Id] uniqueidentifier PRIMARY KEY,
  [AccountId] uniqueidentifier NOT NULL,
  [StatusId] int NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [MiddleName] nvarchar(50),
  [LastName] nvarchar(50) NOT NULL,
  [Version] int
)
GO

CREATE TABLE [MemberStatus] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(50) NOT NULL,
  [Code] varchar(10) UNIQUE
)
GO

CREATE TABLE [MembershipLevel] (
  [Id] uniqueidentifier PRIMARY KEY,
  [AccountId] uniqueidentifier NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [Price] decimal NOT NULL,
  [RenewalPeriodId] int NOT NULL
)
GO

CREATE TABLE [RenewalPeriod] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(50) NOT NULL,
  [Code] varchar(10) UNIQUE
)
GO

CREATE TABLE [Subscription] (
  [Id] int PRIMARY KEY,
  [ContactId] uniqueidentifier NOT NULL,
  [MembershipLevelId] uniqueidentifier NOT NULL,
  [Version] int
)
GO

CREATE TABLE [SubscriptionPeriod] (
  [Id] int PRIMARY KEY,
  [SubscriptionId] int NOT NULL,
  [InvoiceId] uniqueidentifier NOT NULL,
  [StartDate] datetimeoffset NOT NULL,
  [EndDate] datetimeoffset NOT NULL
)
GO

CREATE TABLE [Invoice] (
  [Id] uniqueidentifier PRIMARY KEY,
  [ContactId] uniqueidentifier NOT NULL,
  [Amount] decimal NOT NULL,
  [Version] int
)
GO

ALTER TABLE [Account] ADD FOREIGN KEY ([TenantId]) REFERENCES [Tenant] ([Id])
GO

ALTER TABLE [Contact] ADD FOREIGN KEY ([AccountId]) REFERENCES [Account] ([Id])
GO

ALTER TABLE [Contact] ADD FOREIGN KEY ([StatusId]) REFERENCES [MemberStatus] ([Id])
GO

ALTER TABLE [MembershipLevel] ADD FOREIGN KEY ([AccountId]) REFERENCES [Account] ([Id])
GO

ALTER TABLE [MembershipLevel] ADD FOREIGN KEY ([RenewalPeriodId]) REFERENCES [RenewalPeriod] ([Id])
GO

ALTER TABLE [Subscription] ADD FOREIGN KEY ([ContactId]) REFERENCES [Contact] ([Id])
GO

ALTER TABLE [Subscription] ADD FOREIGN KEY ([MembershipLevelId]) REFERENCES [MembershipLevel] ([Id])
GO

ALTER TABLE [SubscriptionPeriod] ADD FOREIGN KEY ([SubscriptionId]) REFERENCES [Subscription] ([Id])
GO

ALTER TABLE [SubscriptionPeriod] ADD FOREIGN KEY ([InvoiceId]) REFERENCES [Invoice] ([Id])
GO

ALTER TABLE [Invoice] ADD FOREIGN KEY ([ContactId]) REFERENCES [Contact] ([Id])
GO
