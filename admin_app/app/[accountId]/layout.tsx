'use server'
import { Menubar } from "primereact/menubar"
import { menuItems } from "./menu-items"
import Image from "next/image"
import apiClient, { ApiError } from "@/lib/api"
import { redirect } from "next/navigation"
import SideNav from "./side-nav"
import Link from "next/link"

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: Promise<{accountId: string}>
}) {
  try  {
    const { accountId } = await params;
    return (
      <>
        <Menubar 
          model={menuItems}
          start={<Link href="/"><Image width={120} height={12.8} src="/memberPLUS.svg" alt="MemberPlus logo" /></Link>}
          end={<a className="p-button p-button-sm font-bold" 
          href="/auth/logout">Logout</a>} 
        />
        <div className="grow flex">
          <SideNav
            accountId={accountId} 
          />
          <div className="p-5 w-full">
            {children}
          </div>
        </div>
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