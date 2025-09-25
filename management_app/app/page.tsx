import PageTitle from "@/components/page-title";
import { auth0 } from "@/lib/auth0";
import { cfg } from "@/lib/cfg";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default async function Home() {

  const session = await auth0.getSession();

  const items: { id: string, name: string, externalId?: string}[] = await fetch(`${cfg.apiBaseUrl}/tenant`, {
    headers: {
      'Authorization': `Bearer ${session?.tokenSet.accessToken}`
    },
  }).then(res => res.json());

  return (
    <div className="space-y-5">
      <PageTitle>Tenants</PageTitle>
      <DataTable value={items} header={<TenantsHeader />}>
        <Column field="id" header="Id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="externalId" header="External Id"></Column>
      </DataTable>
    </div>
  );
}

function TenantsHeader() {
  return (
    <Link className="p-button p-button-sm" href="/tenants/create"><span className="p-button-icon p-c p-button-icon-left pi pi-plus"></span>New Tenant</Link>
  );
}
