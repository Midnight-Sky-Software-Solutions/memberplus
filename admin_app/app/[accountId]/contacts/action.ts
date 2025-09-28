'use server'
import apiClient from "@/lib/api";
import { SortOrder } from "primereact/datatable";

export default async function GetContacts(accountId: string, pageNumber: number, searchTerm: string, sortOrder: SortOrder, sortField: string) {
  const { data } = await apiClient.GET('/api/accounts/{accountId}/Contacts', {
    params: {
      path: {
        accountId: accountId
      },
      query: {
        pageNumber: pageNumber,
        perPage: 5,
        searchTerm,
        sortOrder: sortOrder as number,
        sortField
      }
    }
  });
  return data;
}