import PageTitle from "@/components/page-title";
import apiClient from "@/lib/api";
import UpdateTenantForm from "./update-tenant-form";

type Props = {
  params: Promise<{ tenantId: string }>
}

export default async function EditTenantPage({ params }: Props) {

  const { tenantId } = await params;

  const { data: tenant } = await apiClient.GET('/Tenants/{tenantId}', {
    params: {
      path: {
        tenantId: tenantId
      }
    }
  });

  return (
    <div className="space-y-5">
      <PageTitle>Update Tenant</PageTitle>
      <UpdateTenantForm 
        id={tenant!.id!}
        name={tenant!.name!}
        externalId={tenant!.externalId!}
      />
    </div>
  );
}