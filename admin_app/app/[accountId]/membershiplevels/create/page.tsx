import CreateMembershipLevelForm from "./create-membershiplevel-form";

export default async function CreateMembershipLevelPage({ params }: {
  params: Promise<{accountId: string}>
}) {

  const { accountId } = await params;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">New Membership Level</h1>
      <CreateMembershipLevelForm accountId={accountId} />
    </div>
  );
}