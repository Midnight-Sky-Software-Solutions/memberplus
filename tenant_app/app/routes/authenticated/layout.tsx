import apiClient from "lib/api";
import { Link, Outlet, redirect, useLocation } from "react-router";
import type { components } from "lib/api.d";
import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { AccountContext } from "context/account-context";
import { Menu } from "primereact/menu";
import { useState, type ReactNode } from "react";

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

function sideMenuItems(activeRoute: string): MenuItem[] {
  return [{
    id: 'Account',
    label: 'Account',
    template: (item) => (
      <NavMenuItem
        href={`/`}
        active={activeRoute == '/'}
      >
        {item.label}
      </NavMenuItem>
    )
  },
  {
    id: 'Contacts',
    label: 'Contacts',
    template: (item) => (
      <NavMenuItem
        href={`/contacts`}
        active={activeRoute.startsWith('/contacts')}
      >
        {item.label}
      </NavMenuItem>
    )
  }
  ];
}

export default function AuthenticatedLayout({ loaderData }: {
  loaderData: {
    tenant: components["schemas"]["TenantDto"]
  }
}) {
  const account = loaderData.tenant.accounts[0];
  const { pathname: location } = useLocation();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="hidden md:block">
        <Menubar
          start={<Link to='/' className="font-bold text-2xl">MemberPlus</Link>}
          model={topMenuItems}
          end={<span>{account.name}</span>}
        />
      </div>
      <div className="md:hidden bg-white p-2 text-right sticky top-0 z-99 shadow-sm">
        <i onClick={toggleMobileNav} className="pi pi-bars" style={{ fontSize: '2rem' }}></i>
      </div>
      {mobileNavOpen && (
        <div className="md:hidden bg-black/50 h-[100vh] w-[100vw] z-100 fixed" onClick={toggleMobileNav}>
        </div>
      )}
      <div className={`md:hidden fixed right-0 z-101 transform transition duration-300 ease-in-out  w-50 bg-white h-full ml-auto shadow-md flex justify-center ${mobileNavOpen ? '' : 'translate-x-50'}`}>
        <Menu
          className="h-full"
          model={sideMenuItems(location)}
        />
      </div>
      <AccountContext.Provider value={account}>
        <div className="flex grow">
          <Menu
            className="h-full hidden md:block"
            model={sideMenuItems(location)}
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