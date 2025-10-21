import type { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react"

const tabMenuItems: MenuItem[] = [
  {
    id: 'Dashboard',
    label: 'Dashboard'
  },
  {
    id: 'Account details',
    label: 'Account details'
  },
  // {
  //   id: 'Referrals',
  //   label: 'Referrals'
  // }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <TabMenu 
        className="w-full" 
        model={tabMenuItems}
        onTabChange={e => setActiveIndex(e.index)}
        activeIndex={activeIndex}
      />
      <TabMenuOutlet activeIndex={activeIndex} />
    </>
  )
}

function TabMenuOutlet({ activeIndex }: {
  activeIndex: number
}) {

  if (activeIndex === 0) {
    return (
      <div className="p-10">
        <h1 className="font-bold text-4xl">Dashboard</h1>
      </div>
    );
  }

  if (activeIndex === 1) {
    return (
      <div className="p-10">
        <h1 className="font-bold text-4xl">Account details</h1>
      </div>
    );
  }

  if (activeIndex === 2) {
    return (
      <div className="p-10">
        <h1 className="font-bold text-4xl">Referrals</h1>
      </div>
    );
  }

  return <></>;
}