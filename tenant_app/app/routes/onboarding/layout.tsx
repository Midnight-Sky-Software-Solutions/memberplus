import { Outlet } from "react-router";

export default function OnboardingLayout() {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <Outlet />
    </div>
  );
}