import apiClient from "lib/api";
import { Link, Outlet, redirect } from "react-router";
import type { components } from "lib/api.d";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";

export async function clientLoader() {
  const { data, error, response } = await apiClient.GET("/api/Tenants/me");
  if (response.status === 404) {
    return redirect('/onboarding');
  }
  return {
    tenant: data
  };
}

export default function AuthenticatedLayout({ loaderData }: {
  loaderData: {
    tenant: components["schemas"]["TenantDto"]
  }
}) {
  const account = loaderData.tenant.accounts[0];
  const menuItems: MenuItem[] = [
  ];

  return (
    <div>
      <Menubar 
        start={<Link to='/' className="font-bold text-2xl">MemberPlus</Link>}
        model={menuItems}
        end={<span>{account.name}</span>}
      />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}