'use server'
import apiClient from "@/lib/api";

export default async function GetContacts(accountId: string, searchTerm: string) {
  const { data } = await apiClient.GET('/api/accounts/{accountId}/Contacts', {
    params: {
      path: {
        accountId: accountId
      },
      query: {
        searchTerm
      }
    }
  });
  return data;
}