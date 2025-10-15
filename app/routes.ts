import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("routes/auth.tsx", [
    route("auth/sign-in", "routes/auth.sign-in.tsx"),
    route("auth/sign-up", "routes/auth.sign-up.tsx"),
    route("auth/reset", "routes/auth.reset.tsx"),
    route("auth/request-reset", "routes/auth.request-reset.tsx"),
  ]),

  route("profile", "routes/profile.tsx"),
  route("services", "routes/services.tsx"),
  route("projects", "routes/projects.tsx"),
  route("contact", "routes/contact.tsx"),
  route("get-quote", "routes/get-quote.tsx"),
  route("faq", "routes/faq.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("about", "routes/about.tsx"),
  route("add-edit-project", "routes/add-edit-project.tsx"),
  route("billing", "routes/billing.tsx"),

  layout("routes/admin.tsx", [
    index("routes/admin._index.tsx"),
    route("admin/projects", "routes/admin.projects.tsx"),
  ]),

  layout("routes/error.tsx", [
    index("routes/error._index.tsx"),
    route("error/404", "routes/error.404.tsx"),
    route("error/session-expired", "routes/error.session-expired.tsx"),
    route("error/connection-error", "routes/error.connection-error.tsx"),
  ]),
] satisfies RouteConfig;
