import apiClient from "@/lib/api";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default async function MembershipLevelsPage({ params }: {
  params: Promise<{accountId: string}>
}) {

  const { accountId } = await params;
  const { data } = await apiClient.GET('/api/accounts/{accountId}/MembershipLevels', {
    params: {
      path: {
        accountId
      }
    }
  });
  const membershipLevels = data!;

  return (
    <div className="space-y-8">
      <div className="flex">
        <h1 className="text-4xl font-bold">Membership Levels</h1>
        <div className="grow" />
        <div>
          <Link className="p-button p-button-sm font-bold" href={`/${accountId}/membershiplevels/create`}><span className="p-button-icon p-c p-button-icon-left pi pi-plus"></span>Create Membership Level</Link>
        </div>
      </div>
      <p className="text-gray-600">
        Manage membership levels, including fees and renewal rules.
      </p>
      <DataTable
        value={membershipLevels}
      >
        <Column hidden field="Id"></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="price" header="Price" sortable></Column>
        <Column field="renewalPeriod" header="Renewal Period" sortable></Column>
      </DataTable>
    </div>
  );
}