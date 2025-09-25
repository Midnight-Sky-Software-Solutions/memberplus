import PageTitle from "@/components/page-title";
import { auth0 } from "@/lib/auth0";
import { cfg } from "@/lib/cfg";
import TenantDataTable from "./tenant-data-table";
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await auth0.getSession();

  const res = await fetch(`${cfg.apiBaseUrl}/tenant`, {
    headers: {
      'Authorization': `Bearer ${session?.tokenSet.accessToken}`
    },
  });

  if (res.status === 401) {
    redirect('/auth/login');
  }

  if (!res.ok) {
    console.log(res);
    throw (await res.text())
  }

  const items: { id: string, name: string, externalId?: string}[] = await res.json();

  return (
    <div className="space-y-5">
      <PageTitle>Tenants</PageTitle>
      <TenantDataTable items={items} />
    </div>
  );
}

