import PageTitle from "@/components/page-title";
import { auth0 } from "@/lib/auth0";
import { cfg } from "@/lib/cfg";
import TenantDataTable from "./tenant-data-table";


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
      <TenantDataTable items={items} />
    </div>
  );
}

