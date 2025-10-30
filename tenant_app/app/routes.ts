import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./routes/authenticated/layout.tsx", [
    index("routes/authenticated/home.tsx"),
    ...prefix("contacts", [
      index("routes/authenticated/contacts/contacts.tsx"),
      route("create", "routes/authenticated/contacts/create/create-contact.tsx"),
      route(":id", "routes/authenticated/contacts/view/view-contact.tsx"),
      route(":id/edit", "routes/authenticated/contacts/edit/edit-contact.tsx"),
    ]),
    route("membership", "routes/authenticated/membership/layout.tsx", [
      index("routes/authenticated/membership/membership.tsx"),
      route("levels", "routes/authenticated/membership/levels/levels.tsx")
    ]),
  ]),
  layout("./routes/onboarding/layout.tsx", [
    route("/onboarding", "./routes/onboarding/onboarding.tsx"),
  ]),
  route("/auth/redirect", "./routes/auth/redirect.tsx")
] satisfies RouteConfig;
