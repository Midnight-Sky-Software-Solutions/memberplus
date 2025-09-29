import apiClient from "@/lib/api";
import UpdateContactForm from "./update-contact-form";

export default async function EditContactPage({ params }: {
  params: Promise<{accountId: string, contactId: string}>
}) {

  const { accountId, contactId } = await params;
  const { data } = await apiClient.GET('/api/accounts/{accountId}/Contacts/{contactId}', {
    params: {
      path: {
        accountId,
        contactId
      }
    }
  });
  const contact = data!;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Update Contact</h1>
      <UpdateContactForm 
        accountId={accountId}
        contactId={contact.id!}
        contactVersion={contact.version}
        contactFirstName={contact.firstName}
        contactMiddleName={contact.middleName}
        contactLastName={contact.lastName}
        contactDateOfBirth={contact.dateOfBirth ? new Date(contact.dateOfBirth) : undefined}
      />
    </div>
  );
}