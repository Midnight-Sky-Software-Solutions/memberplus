import Link from "next/link";
import ContactsTable from "./contacts-table";

export default async function ContactsPage({ params }: {
  params: Promise<{accountId: string}>
}) {

  const { accountId } = await params;

  return (
    <div className="space-y-8">
      <div className="flex">
        <h1 className="text-3xl">Contacts</h1>
        <div className="grow" />
        <div>
          <Link className="p-button p-button-sm" href={`/${accountId}/contacts/create`}>Create Contact</Link>
        </div>
      </div>
      <p className="text-gray-600">
        Manage contacts, including creating users, updating their profile, and deleting accounts.
      </p>
      <ContactsTable accountId={accountId} />
    </div>
  );
}