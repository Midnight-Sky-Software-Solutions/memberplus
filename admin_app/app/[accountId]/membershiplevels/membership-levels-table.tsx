'use client'

import { useRouter } from "next/navigation";
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"

export default function MembershipLevelsTable({
  accountId,
  membershipLevels 
}: {
  accountId: string,
  membershipLevels: any[]
}) {

  const router = useRouter();

  return (
    <DataTable
      value={membershipLevels}
      selectionMode="single"
      onRowSelect={e => router.push(`/${accountId}/membershiplevels/${e.data.id}`)}
    >
      <Column hidden field="Id"></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="price" header="Price" sortable></Column>
      <Column field="renewalPeriod" header="Renewal Period" sortable></Column>
    </DataTable>
  )
}