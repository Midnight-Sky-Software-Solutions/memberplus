'use server'

import GetContacts from "./action";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default async function ContactsTable({
  accountId
}: {
  accountId: string
}) {

  const contacts = (await GetContacts(accountId))?.map(contact => ({...contact, dateOfBirth: contact.dateOfBirth?.split('T')[0] ?? ''}));

  return (
    <>
      <DataTable value={contacts}>
        <Column field="firstName" header="First Name"></Column>
        <Column field="middleName" header="Middle Name"></Column>
        <Column field="lastName" header="Last Name"></Column>
        <Column field="dateOfBirth" header="Date of Birth"></Column>
      </DataTable>
    </>
  );
}