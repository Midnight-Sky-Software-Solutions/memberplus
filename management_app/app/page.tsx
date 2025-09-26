import PageTitle from "@/components/page-title";
import TenantDataTable from "./tenant-data-table";
import apiClient from "@/lib/api";


export default async function Home() {

  const { data: items } = await apiClient.GET('/Tenant');

  return (
    <div className="space-y-5">
      <PageTitle>Tenants</PageTitle>
      <TenantDataTable items={items} />
    </div>
  );
}

