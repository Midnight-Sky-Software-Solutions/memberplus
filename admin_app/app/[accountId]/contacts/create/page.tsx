import CreateContactForm from "./create-contact-form";

export default async function CreateContactPage({ params }: {
  params: Promise<{accountId: string}>
}) {

  const { accountId } = await params;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">New Contact</h1>
      <CreateContactForm accountId={accountId} />
    </div>
  );
}