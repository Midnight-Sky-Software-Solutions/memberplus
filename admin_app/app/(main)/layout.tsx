import { Menubar } from "primereact/menubar"
import { menuItems } from "./menu-items"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Menubar model={menuItems} />
      {children}
    </>
  ) 
}