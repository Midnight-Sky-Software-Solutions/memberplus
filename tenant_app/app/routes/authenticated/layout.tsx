import apiClient from "lib/api";
import { Link, Outlet, redirect } from "react-router";
import type { components } from "lib/api.d";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { AccountContext } from "context/account-context";
import { Menu } from "primereact/menu";
import type { ReactNode } from "react";

export async function clientLoader() {
  const { data, error, response } = await apiClient.GET("/api/Tenants/me");
  if (response.status === 404) {
    return redirect('/onboarding');
  }
  return {
    tenant: data
  };
}

const topMenuItems: MenuItem[] = [];

const sideMenuItems: MenuItem[] = [
  {
    id: 'Account', 
    label: 'Account', 
    template: (item) => (
      <NavMenuItem
        href={`/`}
        active={false}
      >
        {item.label}
      </NavMenuItem>
    )
  }
];

export default function AuthenticatedLayout({ loaderData }: {
  loaderData: {
    tenant: components["schemas"]["TenantDto"]
  }
}) {
  const account = loaderData.tenant.accounts[0];

  return (
    <div className="h-full flex flex-col">
      <div className="hidden md:block">
        <Menubar
          start={<Link to='/' className="font-bold text-2xl">MemberPlus</Link>}
          model={topMenuItems}
          end={<span>{account.name}</span>}
        />
      </div>
      <AccountContext.Provider value={account}>
        <div className="flex grow">
          <Menu
            className="h-full hidden md:block"
            model={sideMenuItems}
          />
          <div className="grow">
            <Outlet />
          </div>
        </div>
      </AccountContext.Provider>
    </div>
  );
}

function NavMenuItem({ children, active, href }: {
  children?: ReactNode,
  active: boolean,
  href: string
}) {
  const pending = false;

  return (
    <div className="p-menuitem-content font-bold">
      <Link
        className="p-menuitem-link" 
        to={href}
      >
        <span className={(active ? 'text-blue-500' : '') + (pending ? ' animate-pulse' : '')}>
          {children}
        </span>
      </Link>
    </div>
  );
}