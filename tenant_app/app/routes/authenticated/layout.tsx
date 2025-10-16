import { Outlet } from "react-router";

export default function AuthenticatedLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}