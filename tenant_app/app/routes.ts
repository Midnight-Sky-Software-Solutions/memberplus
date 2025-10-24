import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./routes/authenticated/layout.tsx", [
    index("routes/authenticated/home.tsx"),
    ...prefix("contacts", [
      index("routes/authenticated/contacts/contacts.tsx"),
      route("create", "routes/authenticated/contacts/create/create-contact.tsx"),
    ]),
  ]),
  layout("./routes/onboarding/layout.tsx", [
    route("/onboarding", "./routes/onboarding/onboarding.tsx"),
  ]),
  route("/auth/redirect", "./routes/auth/redirect.tsx")
] satisfies RouteConfig;
