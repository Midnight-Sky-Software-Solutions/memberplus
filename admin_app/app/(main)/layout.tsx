import { Menubar } from "primereact/menubar"
import { menuItems } from "./menu-items"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Menubar model={menuItems} end={<a className="p-button p-button-sm" href="/auth/logout">Logout</a>} />
      {children}
    </>
  ) 
}