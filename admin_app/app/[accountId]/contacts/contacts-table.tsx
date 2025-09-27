'use client'

import GetContacts from "./action";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ChangeEvent, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import lodash from "lodash";

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

  useEffect(() => {
    setLoading(true);
    GetContacts(accountId, effectiveSearchTerm)
      .then(contacts => contacts?.map(contact => ({...contact, dateOfBirth: contact.dateOfBirth?.split('T')[0] ?? ''})))
      .then(contacts => {
        setContacts(contacts ?? []);
        setLoading(false);
      })
  }, [accountId, effectiveSearchTerm]);

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
      >
        <Column field="firstName" header="First Name"></Column>
        <Column field="middleName" header="Middle Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="dateOfBirth" header="Date of Birth"></Column>
      </DataTable>
    </>
  );
}