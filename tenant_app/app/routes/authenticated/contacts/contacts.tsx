import { parseAsIndex, useQueryState } from "nuqs";
import type { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { Link } from "react-router";

const tabMenuItems: MenuItem[] = [
  {
    id: 'List',
    label: 'List'
  },
  {
    id: 'Import',
    label: 'Import'
  }
];

export default function Contacts() {

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
    );
}

function TabMenuOutlet({ activeIndex }: {
  activeIndex: number
}) {

  if (activeIndex === 0) {
    return <ListTab />;
  }

  if (activeIndex === 1) {
    return <ImportTab />; 
  }

  return <></>;
}

function ListTab() {
  return (
    <div className="bg-white grow p-8">
      <div className="flex gap-2 mb-5">
        <Link to="/contacts/create" className="p-button font-bold">Add contact</Link>
        <Link to="/" className="p-button font-bold p-button-outlined">Export</Link>
        <Link to="/" className="p-button font-bold p-button-outlined">Email contacts</Link>
      </div>
      <h1 className="font-bold text-4xl">Contacts</h1>
    </div>
  );
}

function ImportTab() {
  return (
    <p>Import tab works!</p>
  );
}