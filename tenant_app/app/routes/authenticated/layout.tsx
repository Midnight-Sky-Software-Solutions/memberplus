import apiClient from "lib/api";
import { Outlet } from "react-router";

export async function clientLoader() {
  const { data, error } = await apiClient.GET("/api/Tenants/me");
  if (error) {
    throw error;
  }
  return {
    tenant: data
  };
}

export default function AuthenticatedLayout({ loaderData }: {
  loaderData: {
    tenant: {
      id: string,
      name: string
    }
  }
}) {
  console.log('loader data:')

  return (
    <div>
      <Outlet />
    </div>
  );
}