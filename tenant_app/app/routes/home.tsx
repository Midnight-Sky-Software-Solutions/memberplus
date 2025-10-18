import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useEffect } from "react";
import apiClient from "lib/api";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  useEffect(() => {
    apiClient.GET("/api/Tenants/me")
      .then(res => {
        console.log(res);
      });
  }, []);

  return <Welcome />;
}
