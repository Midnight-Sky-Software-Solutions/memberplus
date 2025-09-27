'use client'

import GetContacts from "./action";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ChangeEvent, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import lodash from "lodash";
import { SortOrder } from "primereact/api";

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

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [effectiveSearchTerm, setEffectiveSearchTerm] = useState('');
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC as SortOrder | null | undefined);

  useEffect(() => {
    setLoading(true);
    GetContacts(accountId, effectiveSearchTerm, sortOrder, sortField)
      .then(contacts => contacts?.map(contact => ({...contact, dateOfBirth: contact.dateOfBirth?.split('T')[0] ?? ''})))
      .then(contacts => {
        setContacts(contacts ?? []);
        setLoading(false);
      })
  }, [accountId, effectiveSearchTerm, sortOrder, sortField]);

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
      <DataTable 
        loading={loading}
        value={contacts}
        onSort={e => {
          setSortOrder(e.sortOrder);
          setSortField(e.sortField);
        }}
        sortOrder={sortOrder}
        sortField={sortField}
      >
        <Column field="firstName" header="First Name" sortable></Column>
        <Column field="middleName" header="Middle Name" sortable></Column>
        <Column field="lastName" header="Last Name" sortable></Column>
        <Column field="dateOfBirth" header="Date of Birth" sortable></Column>
      </DataTable>
    </>
  );
}