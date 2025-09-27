'use client'
import Link from "next/link";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { ReactNode } from "react";

const menuItems = (accountId: string): MenuItem[] => [
  { id: 'Contacts', label: 'Contacts', template: (item, _) => (<NavMenuItem href={`/${accountId}/contacts`}>{item.label}</NavMenuItem>) },
];

export default function SideNav({ accountId }: {
  accountId: string
}) {
  return (
    <Menu model={menuItems(accountId)} className="h-full" />
  );
}

function NavMenuItem({ children, href }: {
  children?: ReactNode,
  href: string
}) {
  return (
    <div className="p-menuitem-content"><Link className="p-menuitem-link" href={href}><span className="p-menuitem-text">{children}</span></Link></div>
  )
}