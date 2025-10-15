# MemberPlus

A cloud Association Management SaaS built on top of React and .NET.

## Components

**MemberPlus.Common** - Shared .NET business logic.

**MemberPlus.ManagementAPI** - REST API for internal administration of tenants.

**MemberPlus.OpenAPI** - REST API used by the tenant to manage their account.

**MemberPlus.SQL** - Database schema and migration scripts.

## Getting Started

### Database

You will need a local SQL Server 2022 database server. This can be installed for free for development purposes. Create a database under the server named MemberPlus.

Migration scripts can be found in `MemberPlus.SQL\Migrations`. Run them in order to create the schema.

### Management Application

### Tenant Application