'use server'

import apiClient from '@/lib/api';
import { redirect } from 'next/navigation';
import * as z from 'zod';

export type UpdateContactState = {
  message?: string,
  errors?: {
    [key: string]: string[]
  }
};

const UpdateContact = z.object({
  accountId: z.string(),
  id: z.string(),
  version: z.coerce.number(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string().transform(s => !s ? null : new Date(s).toISOString())
});

export async function updateContact(prevState: UpdateContactState, formData: FormData): Promise<UpdateContactState> {
  const { data, success, error } = UpdateContact.safeParse(Object.fromEntries(formData));
  if (error) {
    return {
      message: error.message
    };
  }
  try {
    const { error } = await apiClient.PUT('/api/accounts/{accountId}/Contacts', {
      params: {
        path: {
          accountId: data.accountId
        }
      },
      body: data
    });
    if (error) {
      return {
        message: undefined,
        errors: error.errors ?? undefined
      }
    }
  }
  catch (e) {
    console.error(e);
    return {
      message: 'Unexpected error'
    }
  }
  redirect(`/${data.accountId}/contacts`);
}