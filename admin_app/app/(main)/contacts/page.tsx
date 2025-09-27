'use client'
import Link from "next/link";
import ContactsTable from "./contacts-table";

export default function ContactsPage() {

  return (
    <div className="space-y-8">
      <div className="flex">
        <h1 className="text-3xl">Contacts</h1>
        <div className="grow" />
        <div>
          <Link className="p-button p-button-sm" href='/contacts/create'>Create Contact</Link>
        </div>
      </div>
      <p className="text-gray-600">
        Manage contacts, including creating users, updating their profile, and deleting accounts.
      </p>
      <ContactsTable  />
    </div>
  );
}