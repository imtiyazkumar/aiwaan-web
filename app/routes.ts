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
  route("services/:id", "routes/service-view.tsx"),
  route("projects", "routes/projects.tsx"),
  route("projects/:id", "routes/project-view.tsx"),
  route("contact", "routes/contact.tsx"),
  route("get-quote", "routes/get-quote.tsx"),
  route("faq", "routes/faq.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("about", "routes/about.tsx"),
  route("testimonials", "routes/testimonials.tsx"),
  route("add-edit-testimonial", "routes/add-edit-testimonial.tsx"),
  // route("api/chat", "routes/api.chat.ts"), // Removed

  layout("routes/admin.tsx", [
    index("routes/admin._index.tsx"),
    route("admin/projects", "routes/admin.projects.tsx"),
    route("admin/orders", "routes/admin.orders.tsx"),
    route("add-edit-project", "routes/add-edit-project.tsx"),
    route("add-edit-service", "routes/add-edit-service.tsx"),
    route("add-edit-order", "routes/add-edit-order.tsx"),
    route("add-edit-bill", "routes/add-edit-bill.tsx"),
    route("billing", "routes/billing.tsx"),
  ]),

  layout("routes/error.tsx", [
    index("routes/error._index.tsx"),
    route("error/404", "routes/error.404.tsx"),
    route("error/session-expired", "routes/error.session-expired.tsx"),
    route("error/connection-error", "routes/error.connection-error.tsx"),
  ]),
] satisfies RouteConfig;
