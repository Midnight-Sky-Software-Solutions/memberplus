'use client'
import Link from "next/link";
import ContactsTable from "./contacts-table";

export default function ContactsPage() {

  return (
    <>
      <h1 className="text-3xl mb-8">Contacts</h1>
      <ContactsTable  />
    </>
  );
}