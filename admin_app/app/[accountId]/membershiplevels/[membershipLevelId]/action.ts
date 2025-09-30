'use server'
import apiClient from "@/lib/api";
import { redirect } from "next/navigation";
import * as z from "zod";


export type UpdateMembershipLevelState = {
  message?: {
    name?: string,
    price?: string,
    renewalPeriodId?: string
  }
};

const UpdateMembershipLevel = z.object({
  id: z.string(),
  version: z.coerce.number().int(),
  accountId: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  renewalPeriodId: z.coerce.number()
});

export async function updateMembershipLevel(prevState: UpdateMembershipLevelState, formData: FormData): Promise<UpdateMembershipLevelState> {
  const { data, success, error } = UpdateMembershipLevel.safeParse(Object.fromEntries(formData));

  if (!success) {
    console.error(error);
    return {
      message: {
        ...error
      }
    }
  }

  await apiClient.PUT('/api/accounts/{accountId}/MembershipLevels', {
    params: {
      path: {
        accountId: data.accountId
      }
    },
    body: data!
  });

  redirect(`/${data.accountId}/membershiplevels`);
}