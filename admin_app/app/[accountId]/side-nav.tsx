'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ReactNode } from "react";

const menuItems = (accountId: string, pathname: string): MenuItem[] => [
  { 
    id: 'Dashboard', 
    label: 'Dashboard', 
    template: (item, _) => (
      <NavMenuItem 
        active={pathname === `/${accountId}`} 
        href={`/${accountId}`}
      >
        <span className="p-menuitem-icon pi pi-gauge" />{item.label}
      </NavMenuItem>
    ) 
  },
  { 
    id: 'Contacts', 
    label: 'Contacts', 
    template: (item, _) => (
      <NavMenuItem 
        active={pathname.startsWith(`/${accountId}/contacts`)} 
        href={`/${accountId}/contacts`}
      >
        <span className="p-menuitem-icon pi pi-users" />{item.label}
      </NavMenuItem>
    ) 
  },
  { 
    id: 'Membership', 
    label: 'Membership', 
    template: (item, _) => (
      <NavMenuItem 
        active={pathname.startsWith(`/${accountId}/membershiplevels`)} 
        href={`/${accountId}/membershiplevels`}
      >
        <span className="p-menuitem-icon pi pi-trophy" />{item.label}
      </NavMenuItem>
    )
  }
];

export default function SideNav({ accountId }: {
  accountId: string
}) {

  const pathname = usePathname();

  return (
    <Menu model={menuItems(accountId, pathname)} className="h-full" />
  );
}

function NavMenuItem({ children, active, href }: {
  children?: ReactNode,
  active: boolean,
  href: string
}) {
  return (
    <div className="p-menuitem-content font-bold"><Link className="p-menuitem-link" href={href}><span className={active ? 'text-blue-500' : ''}>{children}</span></Link></div>
  );
}