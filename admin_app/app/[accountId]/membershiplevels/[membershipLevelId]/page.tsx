import apiClient from "@/lib/api"
import UpdateMembershipLevelForm from "./update-membershiplevel-form";

export default async function EditMembershipLevelPage({ params }: {
  params: Promise<{accountId: string, membershipLevelId: string}>
}) {

  const { accountId, membershipLevelId } = await params;
  const { data: renewalPeriods } = await apiClient.GET('/api/RenewalPeriods');
  const { data } = await apiClient.GET('/api/accounts/{accountId}/MembershipLevels/{membershipLevelId}', {
    params: {
      path: {
        accountId,
        membershipLevelId
      }
    }
  })

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Update Membership Level</h1>
      <UpdateMembershipLevelForm
        accountId={accountId}
        renewalPeriods={renewalPeriods!}
        membershipLevel={data!}
      />
    </div>
  );
}