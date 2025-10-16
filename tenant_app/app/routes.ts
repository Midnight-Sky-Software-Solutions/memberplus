import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/authenticated/layout.tsx", [
    index("routes/home.tsx")
  ]),
  route("/onboarding", "./routes/onboarding/onboarding.tsx")
] satisfies RouteConfig;
