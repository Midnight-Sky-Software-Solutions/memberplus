import { Menubar } from "primereact/menubar"
import { menuItems } from "./menu-items"
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Menubar 
        model={menuItems}
        start={<Image width={120} height={12.8} src="/memberPLUS.svg" alt="MemberPlus logo" />}
        end={<a className="p-button p-button-sm" 
        href="/auth/logout">Logout</a>} 
      />
      {children}
    </>
  ) 
}