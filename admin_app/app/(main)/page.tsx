import apiClient, { ApiError } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function Home() {

  try {
    const { data } = await apiClient.GET("/api/Dashboard");
    const dashboard = data!;
    return (
      <div className="">
        <a href="/auth/login">Login</a>
        <a href="/auth/logout">Logout</a>
        <p>Welcome, {dashboard.tenantName}</p>
      </div>
    );
  }
  catch (e) {
    if (e instanceof ApiError) {
      if (e.statusCode === 404) {
        redirect('/onboarding');
      }
    }
    throw e;
  }
  
}
