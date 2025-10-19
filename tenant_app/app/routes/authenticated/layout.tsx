import apiClient from "lib/api";
import { Outlet, redirect } from "react-router";

export async function clientLoader() {
  const { data, error, response } = await apiClient.GET("/api/Tenants/me");
  if (response.status === 404) {
    return redirect('/onboarding');
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
  return (
    <div>
      <Outlet />
    </div>
  );
}