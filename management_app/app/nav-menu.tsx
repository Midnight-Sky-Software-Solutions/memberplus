'use client'

import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";
import Link from "next/link";
import { ReactNode } from "react";


const menuItems: MenuItem[] = [
  { id: 'Tenants', label: 'Tenants', template: (item, options) => (<NavMenuItem>{item.label}</NavMenuItem>) },
  { id: '2', label: '2' }
];

export default function NavMenu() {
  return (
    <Menu model={menuItems} className="h-[100vh]" />
  );
}

function NavMenuItem({ children }: {
  children?: ReactNode
}) {
  return (
    <div className="p-menuitem-content"><Link className="p-menuitem-link" href="/"><span className="p-menuitem-text">{children}</span></Link></div>
  )
}