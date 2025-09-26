'use server'
import apiClient from "@/lib/api";
import * as z from "zod";

export type UpdateTenantStateType = {
  message: string,
  success: boolean
}

const UpdateTenant = z.object({
  id: z.string(),
  name: z.string(),
  externalId: z.string()
});

export async function updateTenant(previousState: UpdateTenantStateType, formData: FormData): Promise<UpdateTenantStateType> {
  const { success, data, error } = UpdateTenant.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      message: error.message,
      success: false
    }
  }

  try {
    await apiClient.PUT('/Tenants', {
      body: data
    })
  }
  catch (e) {
    console.error(e);
    return {
      message: 'There was an unexpected error trying to create the tenant.',
      success: false
    }
  }

  return  {
    message: '',
    success: true
  }
}