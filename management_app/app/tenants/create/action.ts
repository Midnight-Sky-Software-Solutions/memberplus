'use server'

import apiClient from "@/lib/api";
import { redirect } from "next/navigation";
import * as z from "zod";

export type CreateTenantStateType = {
  message: string
}

const CreateTenant = z.object({
  id: z.string(),
  name: z.string(),
  externalId: z.string()
});

export async function createTenant(previousState: CreateTenantStateType, formData: FormData): Promise<CreateTenantStateType> {
  const { success, data, error } = CreateTenant.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      message: error.message
    }
  }

  try {
    await apiClient.POST('/Tenant');
  }
  catch (e) {
    return {
      message: 'There was an unexpected error trying to create the tenant.'
    }
  }

  redirect('/');
}