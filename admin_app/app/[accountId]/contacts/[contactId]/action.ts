'use server'
import apiClient from "@/lib/api";


export async function deleteContact(accountId: string, contactId: string) {
  await apiClient.DELETE('/api/accounts/{accountId}/Contacts/{contactId}', {
    params: {
      path: {
        accountId,
        contactId
      }
    }
  });
}