import Link from "next/link";
import ContactsTable from "./contacts-table";

export default async function ContactsPage({ params }: {
  params: Promise<{accountId: string}>
}) {

  const { accountId } = await params;

  return (
    <div className="space-y-8">
      <div className="flex">
        <h1 className="text-4xl font-bold">Contacts</h1>
        <div className="grow" />
        <div>
          <Link className="p-button p-button-sm font-bold" href={`/${accountId}/contacts/create`}><span className="p-button-icon p-c p-button-icon-left pi pi-plus"></span>Create Contact</Link>
        </div>
      </div>
      <p className="text-gray-600">
        Manage contacts, including creating users, updating their profile, and deleting accounts.
      </p>
      <ContactsTable accountId={accountId} />
    </div>
  );
}