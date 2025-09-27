'use server'
import apiClient from "@/lib/api";

export default async function GetContacts(accountId: string) {
  const { data } = await apiClient.GET('/api/accounts/{accountId}/Contacts', {
    params: {
      path: {
        accountId: accountId
      }
    }
  });
  return data;
}