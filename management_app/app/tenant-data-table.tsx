'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function TenantDataTable({ items }: {
  items: any
}) {

  const router = useRouter();

  return (
    <DataTable 
        value={items} 
        header={<TenantsHeader />}
        onSelectionChange={(e) => router.push(`/tenants/${e.value.id}`)}
        selectionMode="single"
      >
      <Column field="id" header="Id"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="externalId" header="External Id"></Column>
    </DataTable>
  )
}

function TenantsHeader() {
  return (
    <Link className="p-button p-button-sm" href="/tenants/create"><span className="p-button-icon p-c p-button-icon-left pi pi-plus"></span>New Tenant</Link>
  );
}
