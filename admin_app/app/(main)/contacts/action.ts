'use server'
import apiClient from "@/lib/api";

export default async function GetContacts(accountId: string) {
  const { data } = await apiClient.GET("/api/Contacts", {
    params: {
      query: {
        accountId: accountId
      }
    }
  });
  return data;
}