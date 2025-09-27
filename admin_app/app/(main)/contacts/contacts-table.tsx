'use client'

import { ProfileContext } from "@/hooks/profile-context";
import { useContext, useEffect, useState } from "react";
import GetContacts from "./action";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";

export default function ContactsTable() {

  const profile = useContext(ProfileContext);
  const [contacts, setContacts] = useState([] as {
    firstName?: string | null,
    middleName?: string | null
    lastName?: string | null,
    dateOfBirth?: string | null
  }[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetContacts(profile.accountId!)
      .then(contacts => {
        if (contacts) {
          setContacts(contacts.map(contact => ({...contact, dateOfBirth: contact.dateOfBirth?.split('T')[0] ?? ''})));
        }
        setLoading(false);
      });
  }, [profile.accountId]);

  return (
    <>
      <DataTable value={contacts} loading={loading}>
        <Column field="firstName" header="First Name"></Column>
        <Column field="middleName" header="Middle Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="dateOfBirth" header="Date of Birth"></Column>
      </DataTable>
    </>
  );
}