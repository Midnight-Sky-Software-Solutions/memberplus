'use server'

import apiClient from '@/lib/api';
import { redirect } from 'next/navigation';
import * as z from 'zod';

export type CreateContactState = {
  message?: string
};

const CreateContact = z.object({
  accountId: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string().transform(s => !s ? null : new Date(s).toISOString())
});

export async function createContact(prevState: CreateContactState, formData: FormData): Promise<CreateContactState> {
  const { data, success, error } = CreateContact.safeParse(Object.fromEntries(formData))

  if (!success) {
    return {
      message: error.message
    };
  }

  let id: string;
  try {
    const { data: contactId } = await apiClient.POST('/api/Contacts', {
      body: data
    });
    id = contactId!;
  }
  catch (e) {
    console.error(e);
    return {
      message: 'An unexpected error occured.'
    };
  }
  redirect(`/contacts/${id}`);
}