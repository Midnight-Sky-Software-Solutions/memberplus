import { auth0 } from "@/lib/auth0";
import { Button } from 'primereact/button';                             
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default async function Home() {

  const session = await auth0.getSession();

  const items: { id: string, name: string, externalId?: string}[] = await fetch('https://localhost:7122/tenant', {
    headers: {
      'Authorization': `Bearer ${session?.tokenSet.accessToken}` 
    }
  }).then(res => res.json());

  return (
    <div className="space-y-5">
      <h1 className="text-4xl">Tenants</h1>
      <Button label="New Tenant" className="mb-5" />
      <div>
        <DataTable value={items}>
          <Column field="id" header="Id"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="externalId" header="External Id"></Column>
        </DataTable>
      </div>
    </div>
  );
}
