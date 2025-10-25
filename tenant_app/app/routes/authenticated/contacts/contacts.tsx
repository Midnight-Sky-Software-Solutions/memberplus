import { AccountContext } from "context/account-context";
import apiClient from "lib/api";
import { parseAsIndex, parseAsInteger, useQueryState } from "nuqs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { MenuItem } from "primereact/menuitem";
import { TabMenu } from "primereact/tabmenu";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import useSWR from "swr";

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
      <div className="flex gap-2">
        <Link to="/contacts/create" className="p-button font-bold">Add contact</Link>
        <Link to="/" className="p-button font-bold p-button-outlined">Export</Link>
        <Link to="/" className="p-button font-bold p-button-outlined">Email contacts</Link>
      </div>
      <h1 className="font-bold text-4xl my-8">Contacts</h1>
      <ContactsDataTable />
    </div>
  );
}

function ContactsDataTable() {
  const navigate = useNavigate();
  const { id: accountId } = useContext(AccountContext);
  const perPage = 8;
  const fetcher = (pageNumber: string) => apiClient.GET("/api/Accounts/{accountId}/Contacts", {
    params: {
      path: {
        accountId
      },
      query: {
        perPage,
        pageNumber: +pageNumber
      }
    }
  });
  const [pageNumber, setPageNumber] = useQueryState('page', parseAsInteger.withDefault(0));
  const { data, error, isLoading } = useSWR(`${pageNumber}`, fetcher);

  if (error) {
    return <p>Error loading the data table.</p>;
  }

  return (
    <DataTable
      lazy
      paginator
      value={data?.data?.items}
      loading={isLoading}
      rows={perPage}
      onPage={(event) => setPageNumber(event.page!)}
      first={pageNumber*perPage}
      totalRecords={data?.data?.totalRecords}
      selectionMode="single"
      onRowSelect={e => navigate(`/contacts/${e.data.id}`)}
    >
      <Column header="Contact" body={(data) => <><strong>{data.lastName}, {data.firstName}</strong> ({data.email})<br />{data.id}</>} />
      <Column header="Membership" />
      <Column header="Events" />
      <Column header="Donations" />
      <Column header="Balance" field="balance" />
    </DataTable>
  );
}


function ImportTab() {
  return (
    <p>Import tab works!</p>
  );
}