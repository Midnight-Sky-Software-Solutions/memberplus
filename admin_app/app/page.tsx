import apiClient from "@/lib/api";
import { redirect } from "next/navigation";

export default async function MainPage() {
  const { data } = await apiClient.GET('/api/Dashboard');
  redirect(`/${data?.accountId}/`);
}