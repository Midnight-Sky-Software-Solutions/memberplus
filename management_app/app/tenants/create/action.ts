'use server'

import { auth0 } from "@/lib/auth0";
import { cfg } from "@/lib/cfg";
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

  const session = await auth0.getSession();
  const res = await fetch(`${cfg.apiBaseUrl}/tenant`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session?.tokenSet.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    console.error(await res.text());
    return {
      message: 'There was an unexpected error trying to create the tenant.'
    }
  }

  redirect('/');
}