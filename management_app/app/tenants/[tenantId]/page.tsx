import apiClient from "@/lib/api";

type Props = {
  params: Promise<{ tenantId: string }>
}

export default async function EditTenantPage({ params }: Props) {

  const { tenantId } = await params;

  const { data: tenant } = await apiClient.GET('/Tenant/{tenantId}', {
    params: {
      path: {
        tenantId: tenantId
      }
    }
  });

  return (
    <p>Edit tenant works! {tenant!.name}</p>
  );
}