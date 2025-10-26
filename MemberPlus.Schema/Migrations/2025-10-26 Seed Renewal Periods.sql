USE [MemberPlus]
GO
SET IDENTITY_INSERT [dbo].[RenewalPeriod] ON 
GO
INSERT [dbo].[RenewalPeriod] ([Id], [Name], [Code]) VALUES (1, N'Never', 'RPN')
GO
INSERT [dbo].[RenewalPeriod] ([Id], [Name], [Code]) VALUES (2, N'Monthly', 'RPM')
GO
INSERT [dbo].[RenewalPeriod] ([Id], [Name], [Code]) VALUES (3, N'Quarterly', 'RPQ')
GO
INSERT [dbo].[RenewalPeriod] ([Id], [Name], [Code]) VALUES (4, N'Twice a year', 'RPT')
GO
INSERT [dbo].[RenewalPeriod] ([Id], [Name], [Code]) VALUES (5, N'Every year', 'RPA')
GO
SET IDENTITY_INSERT [dbo].[RenewalPeriod] OFF
GO
