import { auth0 } from "@/lib/auth0";
import { cfg } from "@/lib/cfg";

type Props = {
  params: Promise<{ tenantId: string }>
}

export default async function EditTenantPage({ params }: Props) {

  const { tenantId } = await params;

  const session = await auth0.getSession();

  const res = await fetch(`${cfg.apiBaseUrl}/tenant/${tenantId}`, {
    headers: {
      'Authorization': `Bearer ${session?.tokenSet.accessToken}`
    },
  });

  if (!res.ok) {
    throw (await res.text())
  }

  const tenant: { id: string, name: string, externalId?: string } = await res.json();

  return (
    <p>Edit tenant works! {tenant.name}</p>
  );
}