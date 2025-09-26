'use server'

import apiClient from "@/lib/api";
import { redirect } from "next/navigation";
import * as z from "zod";

const Tenant = z.object({
  name: z.string(),
});

type OnboardTenantActionStateType = {
  message?: string
};

export async function onboardTenant(prevState: OnboardTenantActionStateType, formData: FormData): Promise<OnboardTenantActionStateType> {
  const { data, error, success } = Tenant.safeParse(Object.fromEntries(formData));
  if (success) {
    try {
      await apiClient.POST('/api/Onboarding', {
        body: data
      });
    }
    catch (e) {
      return {
        message: 'Unexpected error'
      };
    }
    redirect('/');
  }
  return {
    message: error?.message
  }
}