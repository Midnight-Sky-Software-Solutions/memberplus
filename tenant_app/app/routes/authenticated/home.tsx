import { parseAsIndex, useQueryState } from "nuqs";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
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
  const [activeIndex, setActiveIndex] = useQueryState('tab', parseAsIndex.withDefault(0));

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
      <DashboardTab />
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

function DashboardTab() {
  return (
    <div className="p-8">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <Card className="mt-5">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="space-y-3">
            <h2 className="font-bold text-xl">Your account</h2>
            <p>
              Free trial is active until 20 Dec 2025
            </p>
            <div className="flex gap-2 flex-col sm:flex-row">
              <a className="p-button font-bold">Upgrade to paid</a>
              <a className="p-button font-bold p-button-outlined">Pricing</a>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="font-bold text-xl">Active members</h2>
            <span className="text-4xl text-gray-500">0</span>
          </div>
          <div className="space-y-3">
            <h2 className="font-bold text-xl">This month's revenue</h2>
            <span className="text-4xl text-gray-500">$0.00</span>
          </div>
        </div>
      </Card>
    </div>
  );
}