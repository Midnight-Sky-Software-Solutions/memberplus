'use client'

import GetContacts from "./action";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ChangeEvent, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import lodash from "lodash";
import { SortOrder } from "primereact/api";
import { useRouter } from "next/navigation";

export default function ContactsTable({
  accountId
}: {
  accountId: string
}) {

  const [contacts, setContacts] = useState([] as {
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    dateOfBirth?: string | null
  }[]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [effectiveSearchTerm, setEffectiveSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC as SortOrder | null | undefined);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (pageNumber >= 0) {
      setLoading(true);
      GetContacts(accountId, pageNumber, effectiveSearchTerm, sortOrder, sortField)
        .then(contacts => {
          setTotalRecords(contacts?.totalRecords!);
          return contacts?.items?.map(contact => ({...contact, dateOfBirth: contact.dateOfBirth?.split('T')[0] ?? ''}))
        })
        .then(contacts => {
          setContacts(contacts ?? []);
          setLoading(false);
        })
    }
  }, [accountId, effectiveSearchTerm, sortOrder, sortField, pageNumber]);

  const debouncedSearch = lodash.debounce(() => {
    setEffectiveSearchTerm(searchTerm);
  }, 500);

  useEffect(debouncedSearch, [searchTerm]);

  return (
    <>
      <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
          <i className="pi pi-search"></i>
        </span>
        <InputText 
          placeholder="Search for a user's name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <DataTable lazy paginator
        selectionMode="single"
        loading={loading}
        onPage={(event) => setPageNumber(event.page!)}
        onRowSelect={(event) => router.push(`/${accountId}/contacts/${event.data.id}`)}
        value={contacts}
        first={pageNumber*5}
        rows={5}
        totalRecords={totalRecords}
        onSort={e => {
          setSortOrder(e.sortOrder);
          setSortField(e.sortField);
        }}
        sortOrder={sortOrder}
        sortField={sortField}
      >
        <Column hidden field="Id"></Column>
        <Column field="firstName" header="First Name" sortable></Column>
        <Column field="middleName" header="Middle Name" sortable></Column>
        <Column field="lastName" header="Last Name" sortable></Column>
        <Column field="memberStatus" header="Member Status" sortable></Column>
        <Column field="dateOfBirth" header="Date of Birth" sortable></Column>
      </DataTable>
    </>
  );
}