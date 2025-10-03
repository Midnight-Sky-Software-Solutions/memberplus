'use server'
import apiClient from "@/lib/api";
import { redirect } from "next/navigation";
import * as z from "zod";

export type CreateMembershipLevelState = {
  message?: {
    name?: string,
    price?: string
  }
};

const CreateMembershipLevel = z.object({
  accountId: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  renewalPeriodId: z.coerce.number().int()
});

export async function createMembershipLevel(prevState: CreateMembershipLevelState, formData: FormData): Promise<CreateMembershipLevelState> {
  const { data, success, error } = CreateMembershipLevel.safeParse(Object.fromEntries(formData));

  if (!success) {
    console.error(error);
    return {
      message: {
        ...error
      }
    }
  }

  await apiClient.POST('/api/accounts/{accountId}/MembershipLevels', {
    params: {
      path: {
        accountId: data.accountId
      }
    },
    body: data
  })

  redirect(`/${data.accountId}/membershiplevels`);
}