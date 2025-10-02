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

export async function activateContact(accountId: string, contactId: string, membershipLevelId: string) {
  await apiClient.POST('/api/accounts/{accountId}/Contacts/{contactId}/membership', {
    params: {
      path: {
        accountId,
        contactId
      }
    },
    body: {
      startDate: (new Date()).toISOString(),
      membershipLevelId,
    }
  })
}