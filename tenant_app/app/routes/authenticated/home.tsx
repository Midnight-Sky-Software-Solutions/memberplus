import { AccountContext } from "context/account-context"
import type { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useContext } from "react"

const tabMenuItems: MenuItem[] = [
  {
    id: 'Dashboard',
    label: 'Dashboard'
  },
  {
    id: 'Account details',
    label: 'Account details'
  },
  {
    id: 'Referrals',
    label: 'Referrals'
  }
];

export default function Home() {
  const account = useContext(AccountContext);

  return (
    <>
      <TabMenu className="w-full" model={tabMenuItems} />
      <div className="p-10">
        <h1 className="font-bold text-4xl">Dashboard</h1>
      </div>
    </>
  )
}