import apiClient from "@/lib/api";

export default async function Home() {

  const { data } = await apiClient.GET("/api/Dashboard");
  const dashboard = data!;

  return (
    <div className="">
      <a href="/auth/login">Login</a>
      <p>Welcome, {dashboard.tenantName}</p>
    </div>
  );
}
