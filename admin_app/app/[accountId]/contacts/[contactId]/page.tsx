import Link from "next/link";
import ActionButtons from "./action-buttons";

export default async function ViewContactPage({ params }: {
  params: Promise<{accountId: string, contactId: string}>
}) {

  const { accountId, contactId } = await params;

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-5xl grow bg-white shadow-sm p-5 border-1 border-gray-300">
        <div className="flex pb-5">
          <div>
            <Link href={`/${accountId}/contacts`}>🠔 Back to contacts</Link>
          </div>
          <div className="grow" />
          <ActionButtons accountId={accountId} contactId={contactId} />
        </div>
        <div className="grid grid-cols-3">
          <div>
            <h2 className="text-gray-600">First Name</h2>
            <p className="font-bold">Joel</p>
          </div>
          <div>
            <h2 className="text-gray-600">Middle Name</h2>
            <p className="font-bold">Alexander</p>
          </div>
          <div>
            <h2 className="text-gray-600">Last Name</h2>
            <p className="font-bold">Johnston</p>
          </div>
        </div>
      </div>
    </div>
  );
}