import { Menubar } from "primereact/menubar"
import { menuItems } from "./menu-items"
import Image from "next/image"
import apiClient, { ApiError } from "@/lib/api"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try  {
    const { data } = await apiClient.GET('/api/Dashboard');
    return (
      <>
        <Menubar 
          model={menuItems}
          start={<Image width={120} height={12.8} src="/memberPLUS.svg" alt="MemberPlus logo" />}
          end={<a className="p-button p-button-sm" 
          href="/auth/logout">Logout</a>} 
        />
        <main className="px-5 mt-5">
          {children}
        </main>
      </>
    )
  }
  catch (e) {
    if (e instanceof ApiError) {
      if (e.statusCode === 404) {
        redirect('/onboarding');
      }
    }
    throw e;
  }
}