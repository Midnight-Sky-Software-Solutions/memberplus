import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/authenticated/layout.tsx", [
    index("routes/authenticated/home.tsx")
  ]),
  layout("./routes/onboarding/layout.tsx", [
    route("/onboarding", "./routes/onboarding/onboarding.tsx"),
  ]),
  route("/auth/redirect", "./routes/auth/redirect.tsx")
] satisfies RouteConfig;
